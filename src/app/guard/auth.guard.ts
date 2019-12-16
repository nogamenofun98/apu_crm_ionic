import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {MenuController, NavController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private navCtrl: NavController,
        private authService: AuthService,
        private menu: MenuController,
        private storage: Storage,
    ) {
    }

    async canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let tgt = '';
        await this.authService.getTGT().toPromise().then(value => {
            tgt = value;
        });

        if (tgt !== null) {
            // authorised so return true
            // future here need to implement the user role detection to prevent unauthorised user to access certain page
            if (state.url !== '/dashboard') {
                let isAuthorise = false;
                await this.storage.get('roleJson').then(roleJson => {
                    Object.keys(roleJson).forEach((key, i) => {
                        // console.error(state.url);
                        // console.error(key);
                        // console.error(state.url.includes(key));
                        if (state.url.includes(key)) { // confirm the role is belong to this url
                            if (roleJson[key] !== 'deny') {
                                // console.error(roleJson[key]);
                                isAuthorise = true;
                            } else {
                                // console.error('denny', roleJson[key]);
                            }
                        }
                    });
                }).catch(error => {
                    // console.error('is either no role id or not authorise');
                    this.navCtrl.navigateRoot('/denied');
                    return false;
                });
                if (isAuthorise) {
                    // console.error('is authorise');
                    await this.menu.enable(true);
                    return true;
                } else {
                    // console.error('is not authorise');
                }
                // console.error('is either no role id or not authorise');
                this.navCtrl.navigateRoot('/denied');
                return false;
            } else {
                // console.error('is dashboard');
                await this.menu.enable(true);
                return true;
            }
        }
        await this.menu.enable(false);
        this.navCtrl.navigateRoot('/');
        return false;
        // // not logged in so redirect to login page with the return url

        //
    }
}
