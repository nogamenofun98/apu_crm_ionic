import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleCompanyPageRoutingModule} from './single-company-routing.module';

import {SingleCompanyPage} from './single-company.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleCompanyPageRoutingModule,
        SharedComponentsModule,
        ReactiveFormsModule
    ],
    declarations: [SingleCompanyPage],
    entryComponents: []
})
export class SingleCompanyPageModule {
}
