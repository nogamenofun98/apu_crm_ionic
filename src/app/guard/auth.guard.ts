import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MenuController, NavController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private menu: MenuController
    ) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        // future here need to implement the user role detection to prevent unauthorised user to access certain page
        let tgt = '';
        await this.authService.getTGT().toPromise().then(value => {
            tgt = value;
        });
        if (tgt !== null) {
            // authorised so return true
            this.menu.enable(true);
            return true;
        }
        this.menu.enable(false);
        this.navCtrl.navigateRoot('/');
        return false;
        // // not logged in so redirect to login page with the return url

        //
    }
}
