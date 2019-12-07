import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreateAreaPageRoutingModule} from './create-area-routing.module';

import {CreateAreaPage} from './create-area.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAreaPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CreateAreaPage]
})
export class CreateAreaPageModule {
}
