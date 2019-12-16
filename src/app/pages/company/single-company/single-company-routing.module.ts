import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleCompanyPage} from './single-company.page';

const routes: Routes = [
  {
    path: '',
    component: SingleCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleCompanyPageRoutingModule {
}
