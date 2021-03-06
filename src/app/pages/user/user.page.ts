import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../../services/alert.service';
import {ModalController, NavController} from '@ionic/angular';
import {EnvService} from '../../services/env.service';
import {AuthService} from '../../services/auth.service';
import {HttpRequestService} from '../../services/http-request.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
    searchString: string;
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

    select(id: any) {
        this.navCtrl.navigateForward('/users/' + id);
    }

    fakeCount(fakeCount: number) {
        return Array(fakeCount);
    }

    private getAll() {
        this.httpRequestService.read('users').then(data => {
            this.items = data.data_response;
            (this.items.length === 0) ? this.noRecord = true : this.noRecord = false;
            for (const item of this.items) {
                if (item.user_role !== null) {
                    this.httpRequestService.read('roles/' + encodeURIComponent(item.user_role)).then(role => {
                        item.role = role.data_response.user_role_description;
                    }).catch(err => console.error(err))
                    ;
                } else {
                    item.role = '';
                }
                if (item.user_handle_industry !== null) {
                    this.httpRequestService.read('industry-areas/' + encodeURIComponent(item.user_handle_industry)).then(area => {
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
}
