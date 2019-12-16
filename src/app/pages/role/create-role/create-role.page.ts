/* tslint:disable:max-line-length object-literal-key-quotes variable-name */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpHeaders} from '@angular/common/http';
import {ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';

@Component({
    selector: 'app-create-role',
    templateUrl: './create-role.page.html',
    styleUrls: ['./create-role.page.scss'],
})
export class CreateRolePage implements OnInit {
    createForm: FormGroup;
    lists: any[];

    constructor(private modalController: ModalController,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService) {
        this.createForm = this.formBuilder.group({
            user_role_description: ['', Validators.compose([
                Validators.required
            ])],
            role_view: [''],
            role_full: [''],
            area_view: [''],
            area_full: [''],
            user_view: [''],
            user_full: [''],
            company_view: [''],
            company_full: [''],
            employee_view: [''],
            employee_full: [''],
            report_view: [''],
            report_full: [''],
            email_view: [''],
            email_full: [''],
        });
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const roles = (form.get('role_full').value === true) ? 'full' : (form.get('role_view').value === true) ? 'view' : 'deny';
            const areas = (form.get('area_full').value === true) ? 'full' : (form.get('area_view').value === true) ? 'view' : 'deny';
            const users = (form.get('user_full').value === true) ? 'full' : (form.get('user_view').value === true) ? 'view' : 'deny';
            const companies = (form.get('company_full').value === true) ? 'full' : (form.get('company_view').value === true) ? 'view' : 'deny';
            const employees = (form.get('employee_full').value === true) ? 'full' : (form.get('employee_view').value === true) ? 'view' : 'deny';
            const reports = (form.get('report_full').value === true) ? 'full' : (form.get('report_view').value === true) ? 'view' : 'deny';
            const emails = (form.get('email_full').value === true) ? 'full' : (form.get('email_view').value === true) ? 'view' : 'deny';
            const body = {
                user_role_description: form.get('user_role_description').value,
                user_role_json: {roles, areas, users, companies, employees, reports, emails}
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('roles', JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            }).catch(err => console.error(err))
            ;
        });
    }
}
