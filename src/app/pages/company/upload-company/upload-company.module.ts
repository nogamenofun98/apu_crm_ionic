import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UploadCompanyPageRoutingModule} from './upload-company-routing.module';

import {UploadCompanyPage} from './upload-company.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UploadCompanyPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [UploadCompanyPage]
})
export class UploadCompanyPageModule {
}
