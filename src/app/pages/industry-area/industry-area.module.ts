import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IndustryAreaPageRoutingModule} from './industry-area-routing.module';

import {IndustryAreaPage} from './industry-area.page';
import {IndustryAreaFilterPipe} from '../../pipes/industryArea/industry-area-filter.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndustryAreaPageRoutingModule
    ],
    declarations: [IndustryAreaPage, IndustryAreaFilterPipe]
})
export class IndustryAreaPageModule {
}
