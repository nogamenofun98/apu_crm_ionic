import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleEmployeePageRoutingModule} from './single-employee-routing.module';

import {SingleEmployeePage} from './single-employee.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleEmployeePageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    declarations: [SingleEmployeePage],
    entryComponents: []
})
export class SingleEmployeePageModule {
}
