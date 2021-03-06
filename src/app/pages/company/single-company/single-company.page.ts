import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EnvService} from '../../../services/env.service';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../../../services/auth.service';
import {SearchModalPage} from '../../sharedModules/search-modal/search-modal.page';
import {CreateConversationPage} from '../../conversation/create-conversation/create-conversation.page';
import {saveAs} from 'file-saver';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-single-company',
    templateUrl: './single-company.page.html',
    styleUrls: ['./single-company.page.scss'],
})
export class SingleCompanyPage implements OnInit {
    item: any;
    isMD: any;
    isEdit: boolean;
    editForm: FormGroup;
    isChecking: boolean;
    industryList: any;
    isManageAll = false;
    industryItem = {id: '', name: ''};
    private id: string;
    section: any;
    contactItems = [];
    contactForm: FormGroup;
    employeeId = '';
    noRecord: boolean;
    employeeItems = [];
    noEmployeeRecord: boolean;

    constructor(private http: HttpClient,
                private route: ActivatedRoute,
                private env: EnvService,
                private actionSheetController: ActionSheetController,
                private modalController: ModalController,
                private alertService: AlertService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService, private authService: AuthService) {
        this.isMD = this.env.isMD;
        this.contactForm = this.formBuilder.group({
            employee_email: ['', Validators.compose([Validators.required])],
        });
    }

    ngOnInit() {
        this.item = null;
        this.section = 'profile';
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.getItem(this.id);
            this.prepareChoice();
        });
    }

    async showMenu() {
        let button = [];
        if (!this.isEdit) {
            button = [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.delete();
                    }
                },
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.isEdit = true;
                    }
                },
                {
                    text: 'New Chat',
                    icon: 'chatboxes',
                    handler: () => {
                        this.newConversation();
                    }
                },
                {
                    text: 'Export Employee List',
                    icon: 'cloud-download',
                    handler: () => {
                        this.export();
                    }
                },
            ];
        } else {
            button = [
                {
                    text: 'Delete',
                    role: 'destructive',
                    icon: 'trash',
                    handler: () => {
                        this.delete();
                    }
                },
                {
                    text: 'Cancel Edit',
                    role: 'destructive',
                    icon: 'close',
                    handler: () => {
                        this.isEdit = false;
                    }
                },
                {
                    text: 'Submit',
                    icon: 'send',
                    handler: () => {
                        this.submitForm();
                    }
                },
                {
                    text: 'New Chat',
                    icon: 'chatboxes',
                    handler: () => {
                        this.newConversation();
                    }
                },
                {
                    text: 'Export Employee List',
                    icon: 'cloud-download',
                    handler: () => {
                        this.export();
                    }
                },
            ];
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            buttons: button,
        });
        await actionSheet.present();
    }

    delete() {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('companies/' + encodeURIComponent(this.id)).then(data => {
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.navCtrl.navigateBack('/companies');
                    }).catch(err => console.error(err))
                    ;
                }
            });
        });
    }

    submitForm() {
        if (this.editForm.valid) {
            this.alertService.presentLoading().then(loading => {
                const loadingObject = loading;
                const body = {
                    company_reg_num: this.editForm.get('company_reg_num').value,
                    company_name: this.editForm.get('company_name').value,
                    company_size: this.editForm.get('company_size').value,
                    company_industry_id: this.editForm.get('company_industry_id').value,
                    company_desc: this.editForm.get('company_desc').value,
                    company_address: this.editForm.get('company_address').value,
                    company_postcode: this.editForm.get('company_postcode').value,
                    company_city: this.editForm.get('company_city').value,
                    company_state: this.editForm.get('company_state').value,
                    company_country: this.editForm.get('company_country').value,
                    company_office_contact_num: this.editForm.get('company_office_contact_num').value,
                };
                const headers = new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                });
                this.httpRequestService.update('companies/' + this.id, JSON.stringify(body), headers).then(data => {
                    this.alertService.presentToast(data.message, 'success', 1500, false);
                    this.isEdit = false;
                    this.getItem(this.editForm.get('company_reg_num').value);
                }).catch(err => console.error(err)).finally(() => loadingObject.dismiss())
                ;
            });
        }
    }

    checkRegNum() {
        const regNum = this.editForm.get('company_reg_num').value;
        if (regNum !== '') {
            this.editForm.get('company_reg_num').setErrors({asd: true}); // prevent the form submit before the http req comes back
            this.isChecking = true;
            this.httpRequestService.read('companies/check-comp-reg-num/' + encodeURIComponent(regNum)).then(data => {
                if (data.hasOwnProperty('data_response')) {
                    this.editForm.get('company_reg_num').setErrors({duplicated: true}); // prevent the form submit before the http req comes back
                } else {
                    this.editForm.get('company_reg_num').setErrors(null);
                }
            }).finally(() => {
                this.isChecking = false;
            });
        }
    }

    createContact() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('companies/' + encodeURIComponent(this.id) + '/contacts/' + this.employeeId, JSON.stringify(null), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.getItem(this.id);
            }).catch(err => console.error(err)).finally(() => loadingObject.dismiss())
            ;
        });
        return false;
    }

    private prepareChoice() {
        this.httpRequestService.read('industry-areas').then(data => {
            this.industryList = data.data_response;
        }).catch(err => console.error(err))
        ;
    }

    private getUserIndustryArea() {
        this.authService.getUserFromStorage().then(user => {
            const industryId = user.user_handle_industry;
            if (industryId !== null) {
                this.httpRequestService.read('industry-areas/' + encodeURIComponent(industryId)).then(data => {
                    if (data.data_response.is_read_only && data.data_response.industry_name === 'All') {
                        this.isManageAll = true;
                    } else {
                        this.editForm.get('company_industry_id').setValue(data.data_response.industry_id);
                        this.industryItem.name = data.data_response.industry_name;
                    }
                });
            }
        });
    }

    deleteContact(id: any) {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('companies/' + encodeURIComponent(this.id) + '/contacts/' + id).then(data => {
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.getItem(this.id);
                    }).catch(err => {
                        console.error(err);
                    });
                }
            });
        });
    }

    private getItem(id: string) {
        this.httpRequestService.read('companies/' + encodeURIComponent(id)).then((data) => {
            this.item = data.data_response;
            this.editForm = this.formBuilder.group({
                company_reg_num: [this.item.company_reg_num, Validators.compose([
                    Validators.required
                ])],
                company_name: [this.item.company_name, Validators.compose([
                    Validators.required
                ])],
                company_size: [this.item.company_size, Validators.compose([
                    Validators.required, Validators.min(1)
                ])],
                company_industry_id: [this.item.company_industry, Validators.compose([
                    Validators.required
                ])],
                company_desc: [this.item.company_desc, Validators.compose([
                    Validators.required
                ])],
                company_address: [this.item.company_address, Validators.compose([])],
                company_postcode: [this.item.company_postcode, Validators.compose([
                    Validators.pattern('^[0-9]{1,6}$')
                ])],
                company_city: [this.item.company_city, Validators.compose([])],
                company_state: [this.item.company_state, Validators.compose([])],
                company_country: [this.item.company_country, Validators.compose([])],
                company_office_contact_num: [this.item.company_office_contact_num, Validators.compose([
                    Validators.required, Validators.pattern('^(\\+?6?0)[0-9]{1,2}-*[0-9]{7,8}$')
                ])],
            });
            // this.editForm.get('company_industry_id').setValue(this.item.company_industry);
            this.getUserIndustryArea();
            this.getContactList(this.id);
            this.getEmployeeList(this.id);
        }).catch(err => {
            console.error(err);
            this.navCtrl.navigateBack('/companies');
        })
        ;
    }

    private getContactList(id: any) {
        this.contactItems = [];
        const contacts = this.item.contacts;
        if (contacts.length === 0) {
            this.contactItems = null;
        }
        contacts.forEach(contact => {
            this.httpRequestService.read('employees/' + contact).then(data => {
                const result = data.data_response;
                const item = {id: result.employee_id, name: result.employee_full_name};
                this.contactItems.push(item);
            });
        });
        (this.contactItems == null) ? this.noRecord = true : this.noRecord = false;

    }

    private getEmployeeList(id: any) {
        this.httpRequestService.read('companies/' + id + '/employee-list').then((data) => {
            this.employeeItems = data.data_response;
            (this.employeeItems.length === 0) ? this.noEmployeeRecord = true : this.noEmployeeRecord = false;
        });
    }

    async openSearch() {
        const createModal = await this.modalController.create({
            component: SearchModalPage,
            cssClass: 'create-modal',
            componentProps: {
                modalController: this.modalController,
                type: 'employees',
            }
        });
        createModal.onDidDismiss().then((response) => {
            if (response.data) {
                this.contactForm.get('employee_email').setValue(response.data.employee_email);
                this.employeeId = response.data.employee_id;
            }
        });
        return await createModal.present();
    }

    async newConversation() {
        const createModal = await this.modalController.create({
            component: CreateConversationPage,
            cssClass: 'create-modal',
            componentProps: {
                modalController: this.modalController,
                source: 'company',
                item: this.item,
            }
        });
        createModal.onDidDismiss().then((isOk) => {
        });
        return await createModal.present();
    }

    export() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        this.http.get(this.env.API_URL + 'companies/' + this.id + '/employee-list/download', {
            headers,
            observe: 'response',
            responseType: 'blob'
        }).pipe(map((res: any) => {
            return new Blob([res.body], {type: 'application/vnd.ms.excel'});

        })).subscribe((res: any) => {
            const date = new Date();
            const file = new File([res], this.id + '_' + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + '.xlsx', {type: 'application/vnd.ms.excel'});
            saveAs(file);
        });
    }
}
