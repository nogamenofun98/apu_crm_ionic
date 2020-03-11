import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleEmployeePageRoutingModule} from './single-employee-routing.module';

import {SingleEmployeePage} from './single-employee.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';
import {SearchModalPage} from '../../sharedModules/search-modal/search-modal.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleEmployeePageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    declarations: [SingleEmployeePage, SearchModalPage],
    entryComponents: [SearchModalPage]
})
export class SingleEmployeePageModule {
}
