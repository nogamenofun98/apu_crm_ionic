import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    showLogin = false;

    constructor(
        private modalController: ModalController,
        private menu: MenuController,
        private authService: AuthService,
        private navCtrl: NavController,
    ) {
    }

    ngOnInit() {
        this.menu.enable(false);
        this.authService.getTGT().subscribe(data => {
            if (data) {
                this.navCtrl.navigateRoot('/dashboard');
            } else {
                this.showLogin = true;
            }
        }, error => {
            console.error(this.constructor.name, error);
        }, () => {
        });
    }
}
