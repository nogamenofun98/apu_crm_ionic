/* tslint:disable:object-literal-shorthand */
import {Injectable} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    constructor(private toastController: ToastController,
                private loadingController: LoadingController,
                public alertController: AlertController) {
    }

    async presentToast(message: any, color: string = 'dark', duration: number = 1500, showClose: boolean = true) {
        const toast = await this.toastController.create({
            message: message,
            duration: duration,
            position: 'bottom',
            color: color,
            keyboardClose: true,
            showCloseButton: showClose,
        });
        toast.present();
        return toast;
    }

    async presentLoading(message: string = 'Please wait...') {
        const loading = await this.loadingController.create({
            message: message,
            duration: 0
        });
        // await loading.present();
        loading.present();
        return loading;
        // const { role, data } = await loading.onDidDismiss();
        //
        // console.log('Loading dismissed!');
    }

    async presentAlertConfirm(message: string) {
        // let result: string;
        const alert = await this.alertController.create({
            backdropDismiss: false,
            header: 'Confirm!',
            message: message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        // console.log('Confirm Cancel: blah');
                        // result = false;
                    }
                }, {
                    text: 'OK',
                    role: 'success',
                    handler: () => {
                        // console.log('Confirm Okay');
                        // result = true;
                    }
                }
            ]
        });
        alert.present();
        return alert;
    }
}
