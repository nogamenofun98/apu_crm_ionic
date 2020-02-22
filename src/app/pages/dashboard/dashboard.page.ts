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
    chartType: any;
    private keys = [];
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
    private values = [];

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
        this.chartType = 'bar';
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

    createChart() {
        if (this.chartObject) {
            if (typeof this.chartObject.destroy === 'function') {
                this.chartObject.destroy();
            }
        }
        this.chartObject = new Chart(this.Chart.nativeElement, {
            type: this.chartType,
            data: {
                labels: this.keys,
                datasets: [{
                    label: 'Count',
                    data: this.values,
                    backgroundColor: ['rgba(255,255,0,0.5)', 'rgba(255,0,255,0.5)', 'rgba(128,128,128,0.5)', 'rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,128,0,0.5)', 'rgba(0,0,255,0.5)', 'rgba(128,0,0,0.5)', 'rgba(128,0,128,0.5)', 'rgba(0,255,255,0.5)'],
                    borderColor: ['rgba(255,255,0,1)', 'rgba(255,0,255,1)', 'rgba(128,128,128,1)', 'rgba(255,0,0,1)', 'rgba(0,255,0,1)', 'rgba(0,128,0,1)', 'rgba(0,0,255,1)', 'rgba(128,0,0,1)', 'rgba(128,0,128,1)', 'rgba(0,255,255,1)'],
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
    }

    getData(createForm: FormGroup) {

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
                this.keys = [];
                this.values = [];
                data.data_response.forEach((item) => {
                    this.keys.push(item.name);
                    this.values.push(item.number);
                });
                this.createChart();

            }).catch(err => console.error(err)).finally(() => {
                loadingObject.dismiss();
            })
            ;
        });
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
