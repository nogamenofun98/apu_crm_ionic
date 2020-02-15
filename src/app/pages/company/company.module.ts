import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CompanyPageRoutingModule} from './company-routing.module';

import {CompanyPage} from './company.page';
import {CreateCompanyPage} from './create-company/create-company.page';
import {UploadCompanyPage} from './upload-company/upload-company.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompanyPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [CompanyPage, CreateCompanyPage, UploadCompanyPage],
    entryComponents: [CreateCompanyPage, UploadCompanyPage]
})
export class CompanyPageModule {
}
