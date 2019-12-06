import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RolePageRoutingModule} from './role-routing.module';

import {RolePage} from './role.page';
import {UserRoleFilterPipe} from '../../pipes/userRole/user-role-filter.pipe';
import {CreateRolePage} from './create-role/create-role.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RolePageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [RolePage, UserRoleFilterPipe, CreateRolePage],
    entryComponents: [CreateRolePage]
})
export class RolePageModule {
}
