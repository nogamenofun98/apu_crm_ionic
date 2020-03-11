import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SearchModalPageRoutingModule} from './search-modal-routing.module';

import {SearchModalPage} from './search-modal.page';
import {SharedComponentsModule} from '../SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SearchModalPageRoutingModule,
        SharedComponentsModule
    ],
    declarations: [SearchModalPage]
})
export class SearchModalPageModule {
}
