import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPageRoutingModule} from './user-routing.module';

import {UserPage} from './user.page';
import {UserFilterPipe} from '../../pipes/user/user-filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserPageRoutingModule
    ],
    declarations: [UserPage, UserFilterPipe]
})
export class UserPageModule {
}
