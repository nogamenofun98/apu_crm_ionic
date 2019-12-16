/* tslint:disable:no-string-literal */
import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {AlertService} from './services/alert.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: 'home'
        },
        {
            title: 'Industry Area',
            url: '/industry-areas',
            icon: 'list'
        },
        {
            title: 'User Role',
            url: '/roles',
            icon: 'list'
        },
        {
            title: 'User',
            url: '/users',
            icon: 'list'
        },
        {
            title: 'Company',
            url: '/companies',
            icon: 'list'
        },
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authService: AuthService,
        private navCtrl: NavController,
        private alertService: AlertService,
    ) {
        this.initializeApp();

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            // this.splashScreen.hide();
            this.authService.getTGT();
        });
    }

    logout() {
        this.authService.getTGT().subscribe(data => {
            this.authService.logout(data).subscribe(
                () => {
                    this.alertService.presentToast('Logout successfully!', 'success');
                },
                error => {
                    console.error(this.constructor.name, ': ', error);
                },
                () => {
                    this.navCtrl.navigateRoot('/');
                }
            );
        }, error => {
            console.error(this.constructor.name, ': ', error);
        }, () => {
        });
    }

    willclose() {
        console.error('willclose');
    }

    didclose() {
        console.error('didclose');
    }

    willopen() {
        console.error('willopen');
    }

    didopen() {
        console.error('didopen');
    }

}
