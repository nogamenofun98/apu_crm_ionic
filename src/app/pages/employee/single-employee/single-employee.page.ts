import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EnvService} from '../../../services/env.service';
import {ActionSheetController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {AuthService} from '../../../services/auth.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-single-employee',
    templateUrl: './single-employee.page.html',
    styleUrls: ['./single-employee.page.scss'],
})
export class SingleEmployeePage implements OnInit {

    item: any;
    jobItems: any;
    isMD: any;
    isEdit: boolean;
    editForm: FormGroup;
    jobForm: FormGroup;
    isChecking: boolean;
    industryList: any;
    isManageAll = false;
    empIndustryArea = '';
    industryItem = {id: '', name: ''};
    section: any;
    private id: string;

    constructor(private route: ActivatedRoute,
                private env: EnvService,
                private actionSheetController: ActionSheetController,
                private alertService: AlertService,
                private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService, private authService: AuthService) {
        this.isMD = this.env.isMD;
        this.jobForm = this.formBuilder.group({
            employee_company_Id: ['', Validators.compose([Validators.required])],
            job_designation: ['', Validators.compose([])],
            job_department: ['', Validators.compose([])],
            job_hired_date: ['', Validators.compose([])],
            is_current_job: [false, Validators.compose([])],
        });
    }

    ngOnInit() {
        this.section = 'profile';
        this.item = null;
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            this.getItem(this.id);
            this.prepareChoice();
            this.getUserIndustryArea();
            this.getJobsList(this.id);
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

    delete() {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('employees/' + encodeURIComponent(this.id)).then(data => {
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.navCtrl.navigateBack('/employees');
                    }).catch(err => console.error(err))
                    ;
                }
            });
        });
    }

    submitForm() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                employee_full_name: this.editForm.get('employee_full_name').value,
                employee_email: this.editForm.get('employee_email').value,
                employee_alumnus: this.editForm.get('employee_alumnus').value,
                employee_intake_code: this.editForm.get('employee_intake_code').value,
                employee_grad_time: this.editForm.get('employee_grad_time').value,
                employee_industry_id: this.editForm.get('employee_industry_id').value,
                employee_address: this.editForm.get('employee_address').value,
                employee_postcode: this.editForm.get('employee_postcode').value,
                employee_city: this.editForm.get('employee_city').value,
                employee_state: this.editForm.get('employee_state').value,
                employee_country: this.editForm.get('employee_country').value,
                employee_contact_num: this.editForm.get('employee_contact_num').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.update('employees/' + this.id, JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.isEdit = false;
                this.getItem(this.id);
            }).catch(err => console.error(err)).finally(() => loadingObject.dismiss())
            ;
        });
    }

    createJob() {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                employee_company_Id: this.jobForm.get('employee_company_Id').value,
                job_designation: this.jobForm.get('job_designation').value,
                job_department: this.jobForm.get('job_department').value,
                job_hired_date: this.jobForm.get('job_hired_date').value,
                is_current_job: this.jobForm.get('is_current_job').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('employees/' + encodeURIComponent(this.id) + '/jobs', JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                this.getJobsList(this.id);
            }).catch(err => console.error(err)).finally(() => loadingObject.dismiss())
            ;
        });

        return false;
    }

    deleteJob(company: any) {
        this.alertService.presentAlertConfirm('Are you sure to delete this record?').then(alert => {
            alert.onDidDismiss().then(confirm => {
                if (confirm.role === 'success') {
                    this.httpRequestService.delete('employees/' + encodeURIComponent(this.id) + '/jobs/' + company).then(data => {
                        this.alertService.presentToast(data.message, 'success', 1500, false);
                        this.getJobsList(this.id);
                    }).catch(err => {
                        console.error(err);
                    });
                }
            });
        });
    }

    private getCompany() {
        const regNum = this.jobForm.get('employee_company_Id').value;
        if (regNum !== '') {
            this.jobForm.get('employee_company_Id').setErrors({asd: true}); // prevent the form submit before the http req comes back
            this.isChecking = true;
            this.httpRequestService.read('companies/check-comp-reg-num/' + encodeURIComponent(regNum)).then(data => {
                const result = data.data_response;
                if (data.hasOwnProperty('data_response')) {
                    if (result.company_industry === this.editForm.get('employee_industry_id').value) {
                        this.jobForm.get('employee_company_Id').setErrors(null);
                    } else {
                        // company not belong to the area
                        this.jobForm.get('employee_company_Id').setErrors({notFound: true});
                    }
                } else {
                    // meaning comp id not found
                    this.jobForm.get('employee_company_Id').setErrors({notFound: true});
                }

            }).catch(() => {
                this.jobForm.get('employee_company_Id').setErrors({notFound: true});
            }).finally(() => {
                this.isChecking = false;
            });
        }
    }

    private getItem(id: string) {
        this.httpRequestService.read('employees/' + encodeURIComponent(id)).then((data) => {
            this.item = data.data_response;
            this.editForm = this.formBuilder.group({
                employee_full_name: [this.item.employee_full_name, Validators.compose([
                    Validators.required
                ])],
                employee_email: [this.item.employee_email, Validators.compose([
                    Validators.email
                ])],
                employee_alumnus: [this.item.employee_alumnus, Validators.compose([
                    Validators.required
                ])],
                employee_intake_code: [this.item.employee_intake_code, Validators.compose([])],
                employee_grad_time: [this.item.employee_grad_time, Validators.compose([])],
                employee_industry_id: [this.item.employee_industry, Validators.compose([])],
                employee_address: [this.item.employee_address, Validators.compose([])],
                employee_postcode: [this.item.employee_postcode, Validators.compose([
                    Validators.pattern('^[0-9]{1,6}$')
                ])],
                employee_city: [this.item.employee_city, Validators.compose([])],
                employee_state: [this.item.employee_state, Validators.compose([])],
                employee_country: [this.item.employee_country, Validators.compose([])],
                employee_contact_num: [this.item.employee_contact_num, Validators.compose([
                    Validators.pattern('^(\\+?6?0)[0-9]{1,2}-*[0-9]{7,8}$')
                ])],
            });
            if (this.item.employee_industry) {
                this.httpRequestService.read('industry-areas/' + this.item.employee_industry).then(area => {
                    this.empIndustryArea = area.data_response.industry_name;
                }).catch(err => console.error(err));
            }
            this.getUserIndustryArea();
        }).catch(err => {
            console.error(err);
            this.navCtrl.navigateBack('/employees');
        })
        ;
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
                        this.editForm.get('employee_industry_id').setValue(data.data_response.industry_id);
                        this.industryItem.name = data.data_response.industry_name;
                    }
                });
            }
        });
    }

    private getJobsList(id) {
        this.httpRequestService.read('employees/' + encodeURIComponent(id) + '/jobs').then(data => {
            this.jobItems = data.data_response;
        }).catch(err => {
            console.error(err);
        });
    }
}
