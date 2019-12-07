/* tslint:disable:forin */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';
import {CreateRolePage} from './create-role/create-role.page';
import {AlertService} from '../../services/alert.service';

@Component({
    selector: 'app-role',
    templateUrl: './role.page.html',
    styleUrls: ['./role.page.scss'],
})
export class RolePage implements OnInit {

    roles: any;
    searchString: string;

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
        this.roles = null;
        this.getAll();
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    getAll() {
        this.httpRequestService.read('roles').then(data => {
            this.roles = data.data_response;
            for (const item of this.roles) {
                let permissions = '';
                const sum = Object.keys(item.user_role_json);
                Object.keys(item.user_role_json).forEach((key, i) => {
                    permissions += key + ': ' + item.user_role_json[key];
                    if ((sum.length - 1) !== i) {
                        permissions += ', '; // add a comma after every loop except last item
                    }
                });
                item.user_role_json = permissions;
            }
        }).catch(err => {
            console.error(err);
        });
    }

    async showCreate() {
        const createModal = await this.modalController.create({
            component: CreateRolePage,
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
        // console.error('selected item!: ', id);
        this.navCtrl.navigateForward('/roles/' + id);
    }


}
