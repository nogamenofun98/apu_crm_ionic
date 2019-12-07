import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleUserPageRoutingModule} from './single-user-routing.module';

import {SingleUserPage} from './single-user.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleUserPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [SingleUserPage]
})
export class SingleUserPageModule {
}
