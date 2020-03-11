import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConversationPageRoutingModule} from './conversation-routing.module';

import {ConversationPage} from './conversation.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConversationPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    declarations: [ConversationPage,],
    entryComponents: []
})
export class ConversationPageModule {
}
