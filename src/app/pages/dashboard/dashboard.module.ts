import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DashboardPageRoutingModule} from './dashboard-routing.module';

import {DashboardPage} from './dashboard.page';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {InterceptorService} from '../../services/interceptor.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashboardPageRoutingModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
    ],
    declarations: [DashboardPage]
})
export class DashboardPageModule {
}
