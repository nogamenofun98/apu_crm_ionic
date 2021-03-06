import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RolePageRoutingModule} from './role-routing.module';

import {RolePage} from './role.page';
import {CreateRolePage} from './create-role/create-role.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RolePageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [RolePage, CreateRolePage],
    entryComponents: [CreateRolePage]
})
export class RolePageModule {
}
