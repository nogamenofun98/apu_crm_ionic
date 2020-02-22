import {Component, OnInit, ViewChild} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnvService} from '../../services/env.service';
import {HttpRequestService} from '../../services/http-request.service';
import {Chart} from 'chart.js';
import {AlertService} from '../../services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
    @ViewChild('Chart', {static: false}) Chart;

    chartObject: any;
    user: any;
    section: any;
    unassignedEmployees: any;
    noRecord: boolean;
    imageLink: any;
    type: string;
    isManageAll: boolean;
    industryList: any;
    industryItem = {id: '', name: ''};
    source: string;
    postcodeError: boolean;
    createForm: FormGroup;
    private statusList: any;

    constructor(private httpRequestService: HttpRequestService,
                private env: EnvService,
                private http: HttpClient,
                private menu: MenuController,
                private authService: AuthService,
                private alertService: AlertService,
                private formBuilder: FormBuilder) {
        this.createForm = this.formBuilder.group({
            conversationEntity: ['', Validators.compose([])],
            conversationType: ['', Validators.compose([])],
            conversationArea: ['', Validators.compose([])],
            conversationCity: ['', Validators.compose([])],
            conversationState: ['', Validators.compose([])],
            conversationCountry: ['', Validators.compose([])],
            conversationDate: ['', Validators.compose([])],
            conversationStatus: ['', Validators.compose([])],
            conversationPostcode: ['', Validators.compose([
                Validators.pattern('^[0-9]{1,6}$')
            ])],
        });
    }

    ngOnInit() {
        this.section = 'home';
        this.getUnassignedEmployee();
        this.prepareChoice();
        this.getUserIndustryArea();
    }

    ionViewWillEnter() {
        this.authService.getUserFromStorage().then(user => {
            this.user = user;
        });
    }

    changeImage(source) {
        this.imageLink = null;
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        this.type = source;
        this.http.get(this.env.API_URL + 'dashboards/word-cloud/' + this.type, {headers, responseType: 'text'}).subscribe(data => {
            this.imageLink = 'data:image/jpg;base64,' + data;
        });
    }

    getGraph(createForm: FormGroup) {
        let keys = [];
        let values = [];
        if (this.chartObject) {
            if (typeof this.chartObject.destroy === 'function') {
                this.chartObject.destroy();
            }
        }
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                source: this.source,
                conversationEntity: createForm.get('conversationEntity').value,
                conversationType: createForm.get('conversationType').value,
                conversationArea: createForm.get('conversationArea').value,
                conversationPostcode: createForm.get('conversationPostcode').value,
                conversationCity: createForm.get('conversationCity').value,
                conversationState: createForm.get('conversationState').value,
                conversationCountry: createForm.get('conversationCountry').value,
                conversationDate: (createForm.get('conversationDate').value === '' ? '' : formatDate(createForm.get('conversationDate').value, 'yyyy-MM', 'en-US')),
                conversationStatus: createForm.get('conversationStatus').value
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('dashboards/report', JSON.stringify(body), headers).then(data => {
                // tslint:disable-next-line:forin
                data.data_response.forEach((item) => {
                    keys.push(item.name);
                    values.push(item.number);
                });
                this.chartObject = new Chart(this.Chart.nativeElement, {
                    type: 'bar',
                    data: {
                        labels: keys,
                        datasets: [{
                            label: 'Count',
                            data: values,
                            backgroundColor: 'rgb(38, 194, 129)',
                            borderColor: 'rgb(38, 194, 129)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }).catch(err => console.error(err)).finally(() => {
                loadingObject.dismiss();
            })
            ;
        });
        keys = [];
        values = [];
        return false;
    }

    private getUnassignedEmployee() {
        this.httpRequestService.read('employees/unassigned').then(data => {
            this.unassignedEmployees = data.data_response;
            if (this.unassignedEmployees.length === 0) {
                this.noRecord = true;
            }
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
                        this.createForm.get('conservationArea').setValue(data.data_response.industry_id);
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
        this.httpRequestService.read('conversations/status').then(data => {
            this.statusList = data.data_response;
        }).catch(err => console.error(err))
        ;
    }
}
