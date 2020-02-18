import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingleConversationPageRoutingModule} from './single-conversation-routing.module';

import {SingleConversationPage} from './single-conversation.page';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleConversationPageRoutingModule,
        ReactiveFormsModule,
        SharedComponentsModule
    ],
    declarations: [SingleConversationPage]
})
export class SingleConversationPageModule {
}
