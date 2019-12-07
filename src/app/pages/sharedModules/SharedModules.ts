import {NgModule} from '@angular/core';
import {LoginPage} from '../auth/login/login.page';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {DisableControlDirective} from '../../directives/disable-control/disable-control.directive';


@NgModule({
    declarations: [LoginPage, DisableControlDirective],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [LoginPage, DisableControlDirective],
    entryComponents: [LoginPage],
})
export class SharedComponentsModule {
}
