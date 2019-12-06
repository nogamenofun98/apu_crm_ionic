import {NgModule} from '@angular/core';
import {LoginPage} from '../auth/login/login.page';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';


@NgModule({
    declarations: [LoginPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [LoginPage],
    entryComponents: [LoginPage],
})
export class SharedComponentsModule {
}
