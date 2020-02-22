import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {CreateEmployeePage} from './create-employee/create-employee.page';
import {saveAs} from 'file-saver';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.page.html',
    styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {

    searchString: any;
    items: any;
    noRecord: boolean;

    constructor(private http: HttpClient,
                private alertService: AlertService,
                private modalController: ModalController,
                private navCtrl: NavController,
                private env: EnvService,
                private authService: AuthService, private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.items = null;
        this.getAll();
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateEmployeePage,
            cssClass: 'create-modal',
            componentProps: {
                modalController: this.modalController,
            }
        });
        createModal.onDidDismiss().then((isOk) => {
            if (isOk.data) {
                this.getAll();
            }
        });
        return await createModal.present();
    }

    select(id: any) {
        this.navCtrl.navigateForward('/employees/' + id);
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    private getAll() {
        this.httpRequestService.read('employees').then(data => {
            this.items = data.data_response;
            (this.items.length === 0) ? this.noRecord = true : this.noRecord = false;
            for (const item of this.items) {
                if (item.employee_industry !== null) {
                    this.httpRequestService.read('industry-areas/' + encodeURIComponent(item.employee_industry)).then(area => {
                        item.industry = area.data_response.industry_name;
                    }).catch(err => console.error(err))
                    ;
                } else {
                    item.industry = '';
                }
            }
        }).catch(err => console.error(err))
        ;
    }

    export() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        this.http.get(this.env.API_URL + 'employees/export', {headers, observe: 'response', responseType: 'blob'}).pipe(map((res: any) => {
            return new Blob([res.body], {type: 'application/vnd.ms.excel'});

        })).subscribe((res: any) => {
            const date = new Date();
            const file = new File([res], 'employees_' + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + '.xlsx', {type: 'application/vnd.ms.excel'});
            saveAs(file);
        });
    }

}
