import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CompanyPageRoutingModule} from './company-routing.module';

import {CompanyPage} from './company.page';
import {CompanyFilterPipe} from '../../pipes/company/company-filter.pipe';
import {CreateCompanyPage} from './create-company/create-company.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CompanyPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CompanyPage, CompanyFilterPipe, CreateCompanyPage],
    entryComponents: [CreateCompanyPage]
})
export class CompanyPageModule {
}
