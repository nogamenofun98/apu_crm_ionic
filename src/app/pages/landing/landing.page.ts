import {Component, OnInit} from '@angular/core';
import {MenuController, ModalController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {LoginPage} from '../auth/login/login.page';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.page.html',
    styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    constructor(
        private modalController: ModalController,
        private menu: MenuController,
        private authService: AuthService,
        private navCtrl: NavController,
    ) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.authService.getTGT().subscribe(data => {
            this.navCtrl.navigateRoot('/dashboard');
        }, error => {
            console.error(this.constructor.name, error);
        }, () => {
        });

    }

    async login() {
        const loginModal = await this.modalController.create({
            component: LoginPage,
        });
        return await loginModal.present();
    }
}
