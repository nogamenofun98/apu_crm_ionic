import {NgModule} from '@angular/core';
import {LoginPageRoutingModule} from './login-routing.module';
import {SharedComponentsModule} from '../../sharedModules/SharedModules';

@NgModule({
    imports: [
        SharedComponentsModule,
        LoginPageRoutingModule
    ],
    declarations: []
})
export class LoginPageModule {
}
