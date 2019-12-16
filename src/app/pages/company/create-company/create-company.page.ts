/* tslint:disable:max-line-length */
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-create-company',
    templateUrl: './create-company.page.html',
    styleUrls: ['./create-company.page.scss'],
})
export class CreateCompanyPage implements OnInit {
    createForm: FormGroup;
    isManageAll = false;
    isChecking = false;
    industryList: any;
    industryItem = {id: '', name: ''};

    constructor(private authService: AuthService, private httpRequestService: HttpRequestService, private modalController: ModalController,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder) {
        // console.error('constructor run');
        this.createForm = this.formBuilder.group({
            company_reg_num: ['', Validators.compose([
                Validators.required
            ])],
            company_name: ['', Validators.compose([
                Validators.required
            ])],
            company_size: [1, Validators.compose([
                Validators.required, Validators.min(1)
            ])],
            company_industry_id: ['', Validators.compose([
                Validators.required
            ])],
            company_desc: ['', Validators.compose([
                Validators.required
            ])],
            company_address: ['', Validators.compose([
                Validators.required
            ])],
            company_postcode: ['', Validators.compose([
                Validators.required, Validators.pattern('^[0-9]{1,6}$')
            ])],
            company_city: ['', Validators.compose([
                Validators.required
            ])],
            company_state: ['', Validators.compose([
                Validators.required
            ])],
            company_country: ['', Validators.compose([
                Validators.required
            ])],
            company_office_contact_num: ['', Validators.compose([
                Validators.required, Validators.pattern('^(\\+?6?0)[0-9]{1,2}-*[0-9]{7,8}$')
            ])],
        });
    }

    ngOnInit() {
        // console.error('ngoninit run');
        this.getUserIndustryArea();
        this.prepareChoice();
    }

    checkRegNum() {
        const regNum = this.createForm.get('company_reg_num').value;
        if (regNum !== '') {
            this.createForm.get('company_reg_num').setErrors({asd: true}); // prevent the form submit before the http req comes back
            this.isChecking = true;
            this.httpRequestService.read('companies/check-comp-reg-num/' + encodeURIComponent(regNum)).then(data => {
                if (data.hasOwnProperty('data_response')) {
                    this.createForm.get('company_reg_num').setErrors({duplicated: true}); // prevent the form submit before the http req comes back
                } else {
                    this.createForm.get('company_reg_num').setErrors(null);
                }
            }).finally(() => {
                this.isChecking = false;
            });
        }
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                company_reg_num: form.get('company_reg_num').value,
                company_name: form.get('company_name').value,
                company_size: form.get('company_size').value,
                company_industry_id: form.get('company_industry_id').value,
                company_desc: form.get('company_desc').value,
                company_address: form.get('company_address').value,
                company_postcode: form.get('company_postcode').value,
                company_city: form.get('company_city').value,
                company_state: form.get('company_state').value,
                company_country: form.get('company_country').value,
                company_office_contact_num: form.get('company_office_contact_num').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('companies', JSON.stringify(body), headers).then(data => {
                this.alertService.presentToast(data.message, 'success', 1500, false);
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            }).catch(err => console.error(err))
            ;
        });
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
        }).catch(err => console.error(err))
        ;
    }
}
