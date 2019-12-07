import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EnvService} from '../../../services/env.service';
import {ActionSheetController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-single-area',
    templateUrl: './single-area.page.html',
    styleUrls: ['./single-area.page.scss'],
})
export class SingleAreaPage implements OnInit {
    item: any;
    id: string;
    isMD: any;
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
        });
    }

    delete() {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('industry-areas/' + this.id).then(data => {
                        if (data instanceof HttpErrorResponse) {
                            this.alertService.presentToast(data.message, 'danger');
                            return;
                        }
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.navCtrl.navigateBack('/industry-areas');
                    });
                }
            });
        });
    }

    submitForm() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                industry_name: this.editForm.get('industry_name').value,
                industry_desc: this.editForm.get('industry_desc').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.update('industry-areas/' + this.id, JSON.stringify(body), headers).then(data => {
                if (data instanceof HttpErrorResponse) {
                    this.alertService.presentToast(data.message, 'danger');
                    return;
                }
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.isEdit = false;
                this.getItem(this.id);
                loadingObject.dismiss();
            });
        });
    }

    private getItem(id: string) {
        this.httpRequestService.read('industry-areas/' + id).then((data) => {
            if (data instanceof HttpErrorResponse) {
                this.alertService.presentToast(data.message, 'danger');
                return;
            }
            this.item = data.data_response;
            this.editForm = this.formBuilder.group({
                industry_name: [this.item.industry_name, Validators.compose([
                    Validators.required
                ])],
                industry_desc: [this.item.industry_desc],
            });
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
            ];
        }
        const actionSheet = await this.actionSheetController.create({
            header: 'Action',
            buttons: button,
        });
        await actionSheet.present();
    }
}
