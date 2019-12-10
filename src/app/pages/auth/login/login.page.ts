import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';
import {AlertService} from '../../../services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    // login_data: any = {};
    loadingObject: any;
    LoginForm: FormGroup;
    private payload: HttpParams;

    constructor(private authService: AuthService,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder) {
        this.LoginForm = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required
            ])],
            password: ['', Validators.compose([
                Validators.required
            ])],
        });
    }

    ngOnInit() {
    }

// login(form: NgForm) {
    login(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            this.loadingObject = loading;
            this.payload = new HttpParams()
                .set('username', form.get('username').value)
                .set('password', form.get('password').value);
            // CAS auth api require the username and password to be in formEncoded format, cant be send like json format
            this.authService.login(this.payload).subscribe(
                data => {
                    // console.error(data);
                    this.authService.checkBlacklisted(data.tgt, data.serviceTicket).then(result => {
                        this.loadingObject.dismiss();
                        if (result) {
                            this.alertService.presentToast('Account is not authorised to use this service!', 'danger', 0, true);
                        } else {
                            this.alertService.presentToast('Login successfully!', 'success');
                            this.navCtrl.navigateRoot('/dashboard');
                        }
                    });
                },
                error => {
                    console.error(this.constructor.name, error);
                    // this.isLoading = false;
                    this.loadingObject.dismiss();
                    this.alertService.presentToast('Username / Password wrong!', 'danger', 0, true);
                },
                () => {
                }
            );
        });
    }
}
