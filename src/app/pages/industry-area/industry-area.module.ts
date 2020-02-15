import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IndustryAreaPageRoutingModule} from './industry-area-routing.module';

import {IndustryAreaPage} from './industry-area.page';
import {CreateAreaPage} from './create-area/create-area.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndustryAreaPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule,
    ],
    declarations: [IndustryAreaPage, CreateAreaPage],
    entryComponents: [CreateAreaPage]
})
export class IndustryAreaPageModule {
}
