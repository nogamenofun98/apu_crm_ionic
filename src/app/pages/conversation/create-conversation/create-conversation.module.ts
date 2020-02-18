import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CreateConversationPageRoutingModule} from './create-conversation-routing.module';

import {CreateConversationPage} from './create-conversation.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateConversationPageRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [CreateConversationPage]
})
export class CreateConversationPageModule {
}
