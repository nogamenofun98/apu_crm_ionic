import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ConversationPageRoutingModule} from './conversation-routing.module';

import {ConversationPage} from './conversation.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';
import {CreateConversationPage} from './create-conversation/create-conversation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ConversationPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    declarations: [ConversationPage, CreateConversationPage],
    entryComponents: [CreateConversationPage]
})
export class ConversationPageModule {
}
