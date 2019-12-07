import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController, NavController} from '@ionic/angular';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-create-area',
    templateUrl: './create-area.page.html',
    styleUrls: ['./create-area.page.scss'],
})
export class CreateAreaPage implements OnInit {
    createForm: FormGroup;

    constructor(private modalController: ModalController,
                private navCtrl: NavController,
                private alertService: AlertService,
                private formBuilder: FormBuilder,
                private httpRequestService: HttpRequestService) {
        this.createForm = this.formBuilder.group({
            industry_name: ['', Validators.compose([
                Validators.required
            ])],
            industry_desc: [''],
        });
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const body = {
                industry_name: form.get('industry_name').value,
                industry_desc: form.get('industry_desc').value,
            };
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            });
            this.httpRequestService.create('industry-areas', JSON.stringify(body), headers).then(data => {
                if (data instanceof HttpErrorResponse) {
                    this.alertService.presentToast(data.message, 'danger');
                    return;
                }
                this.alertService.presentToast(data.message, 'success', 1500, false);
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            });
        });
    }
}
