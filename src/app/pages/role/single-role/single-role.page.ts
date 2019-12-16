/* tslint:disable:no-string-literal max-line-length object-literal-key-quotes */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {EnvService} from '../../../services/env.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-single-role',
    templateUrl: './single-role.page.html',
    styleUrls: ['./single-role.page.scss'],
})
export class SingleRolePage implements OnInit {
    isMD: any;
    private id: string;
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
            const role = (this.editForm.get('role_full').value === true) ? 'full' : (this.editForm.get('role_view').value === true) ? 'view' : 'deny';
            const area = (this.editForm.get('area_full').value === true) ? 'full' : (this.editForm.get('area_view').value === true) ? 'view' : 'deny';
            const user = (this.editForm.get('user_full').value === true) ? 'full' : (this.editForm.get('user_view').value === true) ? 'view' : 'deny';
            const company = (this.editForm.get('company_full').value === true) ? 'full' : (this.editForm.get('company_view').value === true) ? 'view' : 'deny';
            const employee = (this.editForm.get('employee_full').value === true) ? 'full' : (this.editForm.get('employee_view').value === true) ? 'view' : 'deny';
            const report = (this.editForm.get('report_full').value === true) ? 'full' : (this.editForm.get('report_view').value === true) ? 'view' : 'deny';
            const email = (this.editForm.get('email_full').value === true) ? 'full' : (this.editForm.get('email_view').value === true) ? 'view' : 'deny';
            const body = {
                user_role_description: this.editForm.get('user_role_description').value,
                user_role_json: {role, area, user, company, employee, report, email}
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.update('roles/' + this.id, JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.isEdit = false;
                this.getItem(this.id);
                loadingObject.dismiss();
            }).catch(err => console.error(err))
            ;
        });
    }

    async delete() {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('roles/' + encodeURIComponent(this.id)).then(data => {
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.navCtrl.navigateBack('/roles');
                    }).catch(err => console.error(err))
                    ;
                }
            });
        });
    }

    private getItem(id: string) {
        this.httpRequestService.read('roles/' + encodeURIComponent(id)).then((data) => {
            this.item = data.data_response;
            this.getUserFromItem(); // get user detail after they fetch the response
            this.editForm = this.formBuilder.group({
                user_role_description: [this.item.user_role_description, Validators.compose([
                    Validators.required
                ])],
                // user_view: [this.item.user_role_json.user === 'view'],
                role_view: [this.item.user_role_json.roles === 'view'],
                role_full: [this.item.user_role_json.roles === 'full'],
                area_view: [this.item.user_role_json.areas === 'view'],
                area_full: [this.item.user_role_json.areas === 'full'],
                user_view: [this.item.user_role_json.users === 'view'],
                user_full: [this.item.user_role_json.users === 'full'],
                company_view: [this.item.user_role_json.companies === 'view'],
                company_full: [this.item.user_role_json.companies === 'full'],
                employee_view: [this.item.user_role_json.employees === 'view'],
                employee_full: [this.item.user_role_json.employees === 'full'],
                report_view: [this.item.user_role_json.reports === 'view'],
                report_full: [this.item.user_role_json.reports === 'full'],
                email_view: [this.item.user_role_json.emails === 'view'],
                email_full: [this.item.user_role_json.emails === 'full'],
            });
        }).catch(err => {
            console.error(err);
            this.navCtrl.navigateBack('/roles');
        })
        ;
    }

    private getUserFromItem() {
        const userIds: any[] = this.item.users;
        if (this.item.users.length === 0) {
            this.users = null;
            return;
        }
        userIds.forEach(id => {
            this.httpRequestService.read('users/' + encodeURIComponent(id)).then(data => {
                this.users.push(data.data_response);
            }).catch(err => console.error(err))
            ;
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
