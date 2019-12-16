import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {CreateAreaPage} from './create-area/create-area.page';

@Component({
    selector: 'app-industry-area',
    templateUrl: './industry-area.page.html',
    styleUrls: ['./industry-area.page.scss'],
})
export class IndustryAreaPage implements OnInit {
    searchString: string;
    items: any;

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
            component: CreateAreaPage,
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
        this.navCtrl.navigateForward('/industry-areas/' + id);
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    private getAll() {
        this.httpRequestService.read('industry-areas').then(data => {
            this.items = data.data_response;
        }).catch(err => console.error(err))
        ;
    }


}
