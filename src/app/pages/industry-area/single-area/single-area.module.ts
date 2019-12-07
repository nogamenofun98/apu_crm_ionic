import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleAreaPageRoutingModule} from './single-area-routing.module';

import {SingleAreaPage} from './single-area.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleAreaPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [SingleAreaPage],
    exports: []
})
export class SingleAreaPageModule {
}
