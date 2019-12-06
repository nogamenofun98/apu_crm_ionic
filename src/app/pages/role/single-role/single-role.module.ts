import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {SingleRolePageRoutingModule} from './single-role-routing.module';
import {SingleRolePage} from './single-role.page';
import {DisableControlDirective} from '../../../directives/disable-control/disable-control.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleRolePageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [SingleRolePage, DisableControlDirective],
    exports: [
        DisableControlDirective
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SingleRolePageModule {
}
