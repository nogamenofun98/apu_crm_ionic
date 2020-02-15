import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {EmployeePageRoutingModule} from './employee-routing.module';

import {EmployeePage} from './employee.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';
import {CreateEmployeePage} from './create-employee/create-employee.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EmployeePageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [EmployeePage, CreateEmployeePage],
    entryComponents: [CreateEmployeePage]
})
export class EmployeePageModule {
}
