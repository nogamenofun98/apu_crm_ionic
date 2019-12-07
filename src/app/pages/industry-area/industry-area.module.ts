import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IndustryAreaPageRoutingModule} from './industry-area-routing.module';

import {IndustryAreaPage} from './industry-area.page';
import {IndustryAreaFilterPipe} from '../../pipes/industryArea/industry-area-filter.pipe';
import {CreateAreaPage} from './create-area/create-area.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndustryAreaPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [IndustryAreaPage, IndustryAreaFilterPipe, CreateAreaPage],
    entryComponents: [CreateAreaPage]
})
export class IndustryAreaPageModule {
}
