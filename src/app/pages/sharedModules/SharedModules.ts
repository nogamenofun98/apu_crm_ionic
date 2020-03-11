import {NgModule} from '@angular/core';
import {LoginPage} from '../auth/login/login.page';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DisableControlDirective} from '../../directives/disable-control/disable-control.directive';
import {SearchFilterPipe} from '../../pipes/searchFilter/search-filter.pipe';
import {SearchModalPage} from './search-modal/search-modal.page';
import {CreateConversationPage} from '../conversation/create-conversation/create-conversation.page';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    declarations: [LoginPage, DisableControlDirective, SearchFilterPipe, SearchModalPage, CreateConversationPage],
    exports: [LoginPage, DisableControlDirective, SearchFilterPipe, SearchModalPage, CreateConversationPage],
    entryComponents: [LoginPage, SearchModalPage, CreateConversationPage],
})
export class SharedComponentsModule {
}
