import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SingleRolePageRoutingModule} from './single-role-routing.module';
import {SingleRolePage} from './single-role.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleRolePageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [SingleRolePage],
    exports: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SingleRolePageModule {
}
