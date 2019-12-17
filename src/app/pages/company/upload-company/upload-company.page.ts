import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertService} from '../../../services/alert.service';
import {HttpRequestService} from '../../../services/http-request.service';
import {EnvService} from '../../../services/env.service';

@Component({
    selector: 'app-upload-company',
    templateUrl: './upload-company.page.html',
    styleUrls: ['./upload-company.page.scss'],
})
export class UploadCompanyPage implements OnInit {
    createForm: FormGroup;

    constructor(private modalController: ModalController,
                private formBuilder: FormBuilder,
                private alertService: AlertService,
                private httpRequestService: HttpRequestService,
                private http: HttpClient,
                private env: EnvService) {
        this.createForm = this.formBuilder.group({
            csv: ['', Validators.compose([
                Validators.required
            ])]
        });
    }

    ngOnInit() {
    }

    dismissModal() {
        this.modalController.dismiss(false);
    }

    create(form: FormGroup) {
        // console.error(form.get('csv'));
        this.alertService.presentLoading().then(loading => {
            const loadingObject = loading;
            const formData = new FormData();
            formData.append('csv', this.createForm.value.csv);
            const headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
            });
            this.http.post<any>(this.env.API_URL + 'companies/uploader', formData, {headers}).toPromise().then(data => {
                console.error('data: ', data);
                this.alertService.presentToast(data.message, 'success', 1500, false);
            }).catch(error => {
                console.error(error);
            }).finally(() => {
                loadingObject.dismiss();
                this.modalController.dismiss(true);
            });
        });
    }

    fileChanged($event: Event) {
        // console.error($event);
        const file = ($event.target as HTMLInputElement).files[0];
        this.createForm.patchValue({
            csv: file
        });
        // this.createForm.get('csv').updateValueAndValidity();
    }

    downloadTemplate() {
        this.httpRequestService.read('companies/uploader').then(data => {
            window.open(data.url, '_blank');
        });
    }
}
