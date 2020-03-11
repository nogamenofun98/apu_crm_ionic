import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleCompanyPageRoutingModule} from './single-company-routing.module';

import {SingleCompanyPage} from './single-company.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';
import {SearchModalPage} from '../../sharedModules/search-modal/search-modal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleCompanyPageRoutingModule,
        SharedComponentsModule,
        ReactiveFormsModule
    ],
    declarations: [SingleCompanyPage, SearchModalPage],
    entryComponents: [SearchModalPage]
})
export class SingleCompanyPageModule {
}
