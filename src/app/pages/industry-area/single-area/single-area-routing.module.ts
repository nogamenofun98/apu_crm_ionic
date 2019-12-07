import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleAreaPage} from './single-area.page';

const routes: Routes = [
  {
    path: '',
    component: SingleAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleAreaPageRoutingModule {
}
