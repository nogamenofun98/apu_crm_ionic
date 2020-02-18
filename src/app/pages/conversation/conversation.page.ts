import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {saveAs} from 'file-saver';
import {map} from 'rxjs/operators';
import {CreateConversationPage} from './create-conversation/create-conversation.page';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {

    searchString: any;
    section: any;
    items: any;

    constructor(private http: HttpClient,
                private alertService: AlertService,
                private modalController: ModalController,
                private navCtrl: NavController,
                private env: EnvService,
                private authService: AuthService, private httpRequestService: HttpRequestService) {
    }

    ngOnInit() {
        this.section = 'company';
    }

    ionViewWillEnter() {
        this.items = null;
        this.getAll();
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateConversationPage,
            cssClass: 'create-modal',
            componentProps: {
                modalController: this.modalController,
                source: this.section
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
        this.navCtrl.navigateForward('/conversations/' + this.section + '/' + id);
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    export() {
        const headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
        });
        this.http.get(this.env.API_URL + 'conversations/' + this.section + '/export', {
            headers,
            observe: 'response',
            responseType: 'blob'
        }).pipe(map((res: any) => {
            return new Blob([res.body], {type: 'application/vnd.ms.excel'});

        })).subscribe((res: any) => {
            const date = new Date();
            const file = new File([res], this.section + '_conversation_' + date.getDate() + (date.getMonth() + 1) + date.getFullYear() + '.xlsx', {type: 'application/vnd.ms.excel'});
            saveAs(file);
        });
    }

    private getAll() {
        this.items = null;
        this.httpRequestService.read('conversations/' + this.section).then(data => {
            this.items = data.data_response;
        }).catch(err => console.error(err))
        ;
    }


}
