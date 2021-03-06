import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {ModalController, NavController, NavParams} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpHeaders} from '@angular/common/http';
import {SearchModalPage} from '../../sharedModules/search-modal/search-modal.page';

@Component({
    selector: 'app-create-conversation',
    templateUrl: './create-conversation.page.html',
    styleUrls: ['./create-conversation.page.scss'],
})
export class CreateConversationPage implements OnInit {
    createForm: FormGroup;
    source: any;
    targetItem = null;
    isChecking = false;
    industryList: any;
    statusList: any;
    industryArea = {id: '', name: ''};
    private targetId: any;

    constructor(private authService: AuthService, private httpRequestService: HttpRequestService, private modalController: ModalController,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder, private navParams: NavParams) {
        // console.error('constructor run');
        this.source = this.navParams.get('source');
        this.targetItem = this.navParams.get('item');
        this.createForm = this.formBuilder.group({
            target_name: ['', Validators.compose([
                Validators.required
            ])],
            conversation: ['', Validators.compose([])],
            status_id: ['', Validators.compose([
                Validators.required
            ])],
        });
        if (this.targetItem) {
            if (this.source === 'company') {
                this.createForm.get('target_name').setValue(this.targetItem.company_name);
                this.targetId = this.targetItem.company_reg_num;
            } else {
                this.createForm.get('target_name').setValue(this.targetItem.employee_full_name);
                this.targetId = this.targetItem.employee_id;
            }
        }
    }

    ngOnInit() {
        this.prepareChoice();
        this.getUserIndustryArea();
    }

    // checkExist() {
    //     const targetId = this.createForm.get('target_name').value;
    //     if (targetId !== '') {
    //         this.createForm.get('target_name').setErrors({asd: true}); // prevent the form submit before the http req comes back
    //         this.isChecking = true;
    //         let url = '';
    //         if (this.source === 'company') {
    //             url = 'companies/check-comp-reg-num/';
    //         } else {
    //             url = 'employees/check-emp/';
    //         }
    //         this.httpRequestService.read(url + encodeURIComponent(targetId)).then(data => {
    //             const result = data.data_response;
    //             if (data.hasOwnProperty('data_response')) {
    //                 if (this.source === 'company') {
    //                     if (this.industryArea.name === 'All' || result.company_industry === this.industryArea.id) { // check comp is same area as user or not
    //                         this.createForm.get('target_name').setErrors(null);
    //                     } else {
    //                         // company not belong to the area
    //                         this.createForm.get('target_name').setErrors({notFound: true});
    //                     }
    //                     this.targetId = result.company_reg_num;
    //                 } else {
    //                     if (this.industryArea.name === 'All' || result.employee_industry === this.industryArea.id) {
    //                         this.createForm.get('target_name').setErrors(null);
    //                     } else {
    //                         // company not belong to the area
    //                         this.createForm.get('target_name').setErrors({notFound: true});
    //                     }
    //                     this.targetId = result.employee_id;
    //                 }
    //             } else {
    //                 this.createForm.get('target_name').setErrors({notFound: true});
    //             }
    //         }).catch(() => {
    //             this.createForm.get('target_name').setErrors({notFound: true});
    //         }).finally(() => {
    //             this.isChecking = false;
    //         });
    //     }
    // }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                target_id: this.targetId,
                conversation: form.get('conversation').value,
                status_id: form.get('status_id').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('conversations/' + this.source, JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
            }).catch(err => console.error(err)).finally(() => {
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            })
            ;
        });
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

    private prepareChoice() {
        this.httpRequestService.read('conversations/status').then(data => {
            this.statusList = data.data_response;
        }).catch(err => console.error(err))
        ;
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
                    this.createForm.get('target_name').setValue(response.data.company_name);
                    this.targetId = response.data.company_reg_num;
                } else {
                    this.createForm.get('target_name').setValue(response.data.employee_full_name);
                    this.targetId = response.data.employee_id;
                }
            }
        });
        return await createModal.present();
    }
}
