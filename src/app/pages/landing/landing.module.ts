import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {LandingPageRoutingModule} from './landing-routing.module';
import {LandingPage} from './landing.page';
import {SharedComponentsModule} from '../sharedModules/SharedModules';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedComponentsModule,
        LandingPageRoutingModule
    ],
    declarations: [LandingPage],
    entryComponents: [],
})
export class LandingPageModule {
}
