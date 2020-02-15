import {NgModule} from '@angular/core';
import {LoginPage} from '../auth/login/login.page';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DisableControlDirective} from '../../directives/disable-control/disable-control.directive';
import {SearchFilterPipe} from '../../pipes/searchFilter/search-filter.pipe';


@NgModule({
    declarations: [LoginPage, DisableControlDirective, SearchFilterPipe],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [LoginPage, DisableControlDirective, SearchFilterPipe],
    entryComponents: [LoginPage],
})
export class SharedComponentsModule {
}
