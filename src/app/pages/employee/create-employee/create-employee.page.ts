import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.page.html',
    styleUrls: ['./create-employee.page.scss'],
})
export class CreateEmployeePage implements OnInit {
    createForm: FormGroup;
    isManageAll = false;
    isChecking = false;
    industryList: any;
    industryItem = {id: '', name: ''};

    constructor(private authService: AuthService, private httpRequestService: HttpRequestService, private modalController: ModalController,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder) {
        this.createForm = this.formBuilder.group({
            employee_full_name: ['', Validators.compose([
                Validators.required
            ])],
            employee_email: ['', Validators.compose([
                Validators.email
            ])],
            employee_alumnus: ['', Validators.compose([
                Validators.required
            ])],
            employee_intake_code: ['', Validators.compose([])],
            employee_grad_time: ['', Validators.compose([])],
            employee_current_company_Id: [{value: '', disabled: true}, Validators.compose([])],
            current_job_designation: ['', Validators.compose([])],
            current_job_department: ['', Validators.compose([])],
            current_job_hired_date: ['', Validators.compose([])],
            employee_industry_id: ['', Validators.compose([])],
            employee_address: ['', Validators.compose([])],
            employee_postcode: ['', Validators.compose([
                Validators.pattern('^[0-9]{1,6}$')
            ])],
            employee_city: ['', Validators.compose([])],
            employee_state: ['', Validators.compose([])],
            employee_country: ['', Validators.compose([])],
            employee_contact_num: ['', Validators.compose([
                Validators.pattern('^(\\+?6?0)[0-9]{1,2}-*[0-9]{7,8}$')
            ])],
        });
    }

    ngOnInit() {
        // console.error('ngoninit run');
        this.prepareChoice();
        this.getUserIndustryArea();
    }

    ionViewDidEnter() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                employee_full_name: form.get('employee_full_name').value,
                employee_email: form.get('employee_email').value,
                employee_alumnus: form.get('employee_alumnus').value,
                employee_intake_code: form.get('employee_intake_code').value,
                employee_grad_time: form.get('employee_grad_time').value,
                employee_current_company_Id: form.get('employee_current_company_Id').value,
                current_job_designation: form.get('current_job_designation').value,
                current_job_department: form.get('current_job_department').value,
                current_job_hired_date: form.get('current_job_hired_date').value,
                employee_industry_id: form.get('employee_industry_id').value,
                employee_address: form.get('employee_address').value,
                employee_postcode: form.get('employee_postcode').value,
                employee_city: form.get('employee_city').value,
                employee_state: form.get('employee_state').value,
                employee_country: form.get('employee_country').value,
                employee_contact_num: form.get('employee_contact_num').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('employees', JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
            }).catch(err => console.error(err)).finally(() => {
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            })
            ;
        });
    }

    enableCompanyField() {
        this.createForm.get('employee_current_company_Id').enable();
    }

    private getUserIndustryArea() {
        this.authService.getUserFromStorage().then(user => {
            const industryId = user.user_handle_industry;
            if (industryId !== null) {
                this.httpRequestService.read('industry-areas/' + encodeURIComponent(industryId)).then(data => {
                    if (data.data_response.is_read_only && data.data_response.industry_name === 'All') {
                        this.isManageAll = true;
                    } else {
                        this.createForm.get('company_industry_id').setValue(data.data_response.industry_id);
                        this.industryItem.name = data.data_response.industry_name;
                    }
                });
            }
        });
    }

    private prepareChoice() {
        this.httpRequestService.read('industry-areas').then(data => {
            this.industryList = data.data_response;
        }).catch(err => console.error(err));
    }

    private getCompany() {
        const regNum = this.createForm.get('employee_current_company_Id').value;
        if (regNum !== '') {
            this.createForm.get('employee_current_company_Id').setErrors({asd: true}); // prevent the form submit before the http req comes back
            this.isChecking = true;
            this.httpRequestService.read('companies/check-comp-reg-num/' + encodeURIComponent(regNum)).then(data => {
                const result = data.data_response;
                if (data.hasOwnProperty('data_response')) {
                    if (result.company_industry === this.createForm.get('employee_industry_id').value) {
                        this.createForm.get('employee_current_company_Id').setErrors(null);
                    } else {
                        // company not belong to the area
                        this.createForm.get('employee_current_company_Id').setErrors({notFound: true});
                    }
                } else {
                    // meaning comp id not found
                    this.createForm.get('employee_current_company_Id').setErrors({notFound: true});
                }

            }).catch(() => {
                this.createForm.get('employee_current_company_Id').setErrors({notFound: true});
            }).finally(() => {
                this.isChecking = false;
            });
        }
    }
}
