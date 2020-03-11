import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EnvService} from '../../../services/env.service';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {AuthService} from '../../../services/auth.service';
import {HttpHeaders} from '@angular/common/http';
import {SearchModalPage} from '../../sharedModules/search-modal/search-modal.page';

@Component({
    selector: 'app-single-conversation',
    templateUrl: './single-conversation.page.html',
    styleUrls: ['./single-conversation.page.scss'],
})
export class SingleConversationPage implements OnInit {

    item: any;
    isMD: any;
    isEdit: boolean;
    editForm: FormGroup;
    isChecking: boolean;
    industryArea = {id: '', name: ''};
    id: string;
    source: string;
    statusList: any;
    trackImgUrl: string;
    url: any;
    private targetId: any;

    constructor(private route: ActivatedRoute,
                private env: EnvService,
                private actionSheetController: ActionSheetController,
                private modalController: ModalController,
                private alertService: AlertService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService, private authService: AuthService) {
        this.isMD = this.env.isMD;
    }

    ngOnInit() {
        this.item = null;
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.source = params.get('source');
            this.prepareChoice();
            this.getItem(this.id);

        });
    }

    generateUrl() {
        this.trackImgUrl = this.env.API_URL + 'track/conversations/' + this.source + '/' + this.id + '?url=' + encodeURIComponent(this.url);
    }

    async showMenu() {
        let button = [];
        if (!this.isEdit) {
            button = [
                {
                    text: 'Edit',
                    icon: 'create',
                    handler: () => {
                        this.isEdit = true;
                    }
                },
            ];
        } else {
            button = [
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
            ];
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            buttons: button,
        });
        await actionSheet.present();
    }

    submitForm() {
        if (this.editForm.valid) {
            this.alertService.presentLoading().then(loading => {
                const loadingObject = loading;
                const body = {
                    target_id: this.targetId,
                    conversation: this.editForm.get('conversation').value,
                    status_id: this.editForm.get('status_id').value,
                };
                const headers = new HttpHeaders({
                    'Access-Control-Allow-Origin': '*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                });
                this.httpRequestService.update('conversations/' + this.source + '/' + this.id, JSON.stringify(body), headers).then(data => {
                    this.alertService.presentToast(data.message, 'success', 1500, false);
                    this.isEdit = false;
                    this.navCtrl.navigateBack('/conversations'); // because now changed to every edit is new conversation, so redirect to list instead
                    // this.getItem(this.id);
                }).catch(err => console.error(err)).finally(() => loadingObject.dismiss())
                ;
            });
        }
    }

    checkExist() {
        const targetId = this.editForm.get('target_name').value;
        if (targetId !== '') {
            this.editForm.get('target_name').setErrors({asd: true}); // prevent the form submit before the http req comes back
            this.isChecking = true;
            let url = '';
            if (this.source === 'company') {
                url = 'companies/check-comp-reg-num/';
            } else {
                url = 'employees/check-emp/';
            }
            this.httpRequestService.read(url + encodeURIComponent(targetId)).then(data => {
                const result = data.data_response;
                if (data.hasOwnProperty('data_response')) {
                    if (this.source === 'company') {
                        if (this.industryArea.name === 'All' || result.company_industry === this.industryArea.id) { // check comp is same area as user or not
                            this.editForm.get('target_name').setErrors(null);
                        } else {
                            // company not belong to the area
                            this.editForm.get('target_name').setErrors({notFound: true});
                        }
                        this.targetId = result.company_reg_num;
                    } else {
                        if (this.industryArea.name === 'All' || result.employee_industry === this.industryArea.id) {
                            this.editForm.get('target_name').setErrors(null);
                        } else {
                            // company not belong to the area
                            this.editForm.get('target_name').setErrors({notFound: true});
                        }
                        this.targetId = result.employee_id;
                    }
                } else {
                    this.editForm.get('target_name').setErrors({notFound: true});
                }
            }).catch(() => {
                this.editForm.get('target_name').setErrors({notFound: true});
            }).finally(() => {
                this.isChecking = false;
            });
        }
    }

    private prepareChoice() {
        this.httpRequestService.read('conversations/status').then(data => {
            this.statusList = data.data_response;
        }).catch(err => console.error(err))
        ;
    }

    private getUserIndustryArea() {
        this.authService.getUserFromStorage().then(user => {
            const industryId = user.user_handle_industry;
            if (industryId !== null) {
                this.httpRequestService.read('industry-areas/' + encodeURIComponent(industryId)).then(data => {
                    this.industryArea.id = data.data_response.industry_id;
                    this.industryArea.name = data.data_response.industry_name;
                });
            }
        });
    }

    async openSearch() {
        const createModal = await this.modalController.create({
            component: SearchModalPage,
            cssClass: 'create-modal',
            componentProps: {
                modalController: this.modalController,
                type: (this.source === 'company' ? 'companies' : 'employees'),
            }
        });
        createModal.onDidDismiss().then((response) => {
            if (response.data) {
                if (this.source === 'company') {
                    this.editForm.get('target_name').setValue(response.data.company_name);
                    this.targetId = response.data.company_reg_num;
                } else {
                    this.editForm.get('target_name').setValue(response.data.employee_full_name);
                    this.targetId = response.data.employee_id;
                }
            }
        });
        return await createModal.present();
    }

    private getItem(id: string) {
        this.httpRequestService.read('conversations/' + this.source + '/' + encodeURIComponent(id)).then((data) => {
            this.item = data.data_response;
            this.targetId = this.item.target_id; // target id
            this.editForm = this.formBuilder.group({
                target_name: [this.item.target_name, Validators.compose([
                    Validators.required
                ])],
                conversation: [this.item.conversation, Validators.compose([])],
                status_id: [this.item.status_id, Validators.compose([
                    Validators.required
                ])],
            });
            if (this.source === 'employee') {
                this.httpRequestService.read('employees/' + this.targetId).then((employee) => {
                    this.editForm.get('target_name').setValue(employee.data_response.employee_full_name);
                });
            }
            this.getUserIndustryArea();
        }).catch(err => {
            console.error(err);
            this.navCtrl.navigateBack('/conversations');
        })
        ;
    }
}
