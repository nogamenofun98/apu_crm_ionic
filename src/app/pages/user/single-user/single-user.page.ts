import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EnvService} from '../../../services/env.service';
import {ActionSheetController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-single-user',
    templateUrl: './single-user.page.html',
    styleUrls: ['./single-user.page.scss'],
})
export class SingleUserPage implements OnInit {
    item: any;
    isMD: boolean;
    id: any;
    roleList: any[] = [];
    industryList: any[] = [];
    isEdit: boolean;
    editForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private env: EnvService,
                private actionSheetController: ActionSheetController,
                private alertService: AlertService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService) {
        this.isMD = this.env.isMD;
    }

    ngOnInit() {
        this.item = null;
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.getItem(this.id);
            this.prepareChoice();
        });
    }

    // delete() {
    //     this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
    //         alert.onDidDismiss().then(confirm => {
    //             if (confirm.role === 'success') {
    //                 this.httpRequestService.delete('users/' + this.id).then(data => {
    //                     if (data instanceof HttpErrorResponse) {
    //                         this.alertService.presentToast(data.message, 'danger');
    //                         return;
    //                     }
    //                     this.alertService.presentToast(data.message, 'success', 1500, false);
    //                     this.navCtrl.navigateBack('/users');
    //                 });
    //             }
    //         });
    //     });
    // }

    submitForm() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                user_role: this.editForm.get('user_role').value,
                user_handle_industry: this.editForm.get('user_handle_industry').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.update('users/' + this.id, JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.isEdit = false;
                this.getItem(this.id);
                loadingObject.dismiss();
            }).catch(err => console.error(err))
            ;
        });
    }

    async showMenu() {
        let button = [];
        if (!this.isEdit) {
            button = [
                // {
                //     text: 'Delete',
                //     role: 'destructive',
                //     icon: 'trash',
                //     handler: () => {
                //         this.delete();
                //     }
                // },
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
                // {
                //     text: 'Delete',
                //     role: 'destructive',
                //     icon: 'trash',
                //     handler: () => {
                //         this.delete();
                //     }
                // },
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

    private getItem(id: string) {
        this.httpRequestService.read('users/' + encodeURIComponent(id)).then((data) => {
            this.item = data.data_response;
            this.editForm = this.formBuilder.group({
                user_role: [this.item.user_role],
                user_handle_industry: [this.item.user_handle_industry],
            });
        }).catch(err => {
            console.error(err);
            this.navCtrl.navigateBack('/users');
        })
        ;
    }

    private prepareChoice() {
        this.httpRequestService.read('roles').then(data => {
            this.roleList = data.data_response;
        }).catch(err => console.error(err))
        ;
        this.httpRequestService.read('industry-areas').then(data => {
            this.industryList = data.data_response;
        }).catch(err => console.error(err))
        ;
    }
}
