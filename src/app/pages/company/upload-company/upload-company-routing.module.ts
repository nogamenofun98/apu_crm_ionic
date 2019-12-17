import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UploadCompanyPage} from './upload-company.page';

const routes: Routes = [
  {
    path: '',
    component: UploadCompanyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadCompanyPageRoutingModule {
}
