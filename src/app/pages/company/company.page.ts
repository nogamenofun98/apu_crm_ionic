import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {CreateCompanyPage} from './create-company/create-company.page';
import {UploadCompanyPage} from './upload-company/upload-company.page';
import {saveAs} from 'file-saver';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-company',
    templateUrl: './company.page.html',
    styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {
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
            component: CreateCompanyPage,
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
        this.navCtrl.navigateForward('/companies/' + id);
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    private getAll() {
        this.httpRequestService.read('companies').then(data => {
            this.items = data.data_response;
            (this.items.length === 0) ? this.noRecord = true : this.noRecord = false;
            for (const item of this.items) {
                if (item.company_industry !== null) {
                    this.httpRequestService.read('industry-areas/' + encodeURIComponent(item.company_industry)).then(area => {
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

    async showImport() {
        const createModal = await this.modalController.create({
            component: UploadCompanyPage,
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

    export() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        this.http.get(this.env.API_URL + 'companies/export', {headers, observe: 'response', responseType: 'blob'}).pipe(map((res: any) => {
            return new Blob([res.body], {type: 'application/vnd.ms.excel'});

        })).subscribe((res: any) => {
            const date = new Date();
            const file = new File([res], 'companies_' + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + '.xlsx', {type: 'application/vnd.ms.excel'});
            saveAs(file);
        });
    }
}
