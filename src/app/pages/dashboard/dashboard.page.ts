import {Component, OnInit} from '@angular/core';
import {MenuController} from '@ionic/angular';
import {AuthService} from 'src/app/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {EnvService} from '../../services/env.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    user: any;

    constructor(private env: EnvService, private http: HttpClient, private menu: MenuController, private authService: AuthService) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.authService.getUserFromStorage().then(user => {
            this.user = user;
        });
    }


}
