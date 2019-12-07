/* tslint:disable:no-string-literal max-line-length object-literal-key-quotes */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {EnvService} from '../../../services/env.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-single-role',
    templateUrl: './single-role.page.html',
    styleUrls: ['./single-role.page.scss'],
})
export class SingleRolePage implements OnInit {
    isMD: any;
    id: string;
    item: any;
    isEdit: boolean;
    editForm: any;
    users: any[] = [];

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

    submitForm() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const user = (this.editForm.get('user_full').value === true) ? 'full' : (this.editForm.get('user_view').value === true) ? 'view' : 'deny';
            const company = (this.editForm.get('company_full').value === true) ? 'full' : (this.editForm.get('company_view').value === true) ? 'view' : 'deny';
            const employee = (this.editForm.get('employee_full').value === true) ? 'full' : (this.editForm.get('employee_view').value === true) ? 'view' : 'deny';
            const body = {
                user_role_description: this.editForm.get('user_role_description').value,
                user_role_json: {user, company, employee}
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.update('roles/' + this.id, JSON.stringify(body), headers).then(data => {
                if (data instanceof HttpErrorResponse) {
                    this.alertService.presentToast(data.message, 'danger');
                    return;
                }
                this.alertService.presentToast(data['message'], 'success', 1500, false);
                this.isEdit = false;
                this.getItem(this.id);
                loadingObject.dismiss();
            });
        });
    }

    async delete() {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('roles/' + this.id).then(data => {
                        if (data instanceof HttpErrorResponse) {
                            this.alertService.presentToast(data.message, 'danger');
                            return;
                        }
                        console.error(data);
                        this.alertService.presentToast(data['message'], 'success', 1500, false);
                        this.navCtrl.navigateBack('/roles');
                    });
                }
            });
        });
    }

    private getItem(id: string) {
        this.httpRequestService.read('roles/' + id).then((data) => {
            if (data instanceof HttpErrorResponse) {
                this.alertService.presentToast(data.message, 'danger');
                return;
            }
            this.item = data.data_response;
            this.getUserFromItem(); // get user detail after they fetch the response
            this.editForm = this.formBuilder.group({
                user_role_description: [this.item.user_role_description, Validators.compose([
                    Validators.required
                ])],
                user_view: [this.item.user_role_json.user === 'view'],
                user_full: [this.item.user_role_json.user === 'full'],
                company_view: [this.item.user_role_json.company === 'view'],
                company_full: [this.item.user_role_json.company === 'full'],
                employee_view: [this.item.user_role_json.employee === 'view'],
                employee_full: [this.item.user_role_json.employee === 'full'],
            });
        });
    }

    private getUserFromItem() {
        const userIds: any[] = this.item.users;
        userIds.forEach(id => {
            this.httpRequestService.read('users/' + id).then(data => {
                if (data instanceof HttpErrorResponse) {
                    this.alertService.presentToast(data.message, 'danger');
                    return;
                }
                this.users.push(data.data_response);
                // console.error(this.users);
            });
        });
    }


}
