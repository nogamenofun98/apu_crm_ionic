import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateAreaPage} from './create-area.page';

const routes: Routes = [
  {
    path: '',
    component: CreateAreaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateAreaPageRoutingModule {
}
