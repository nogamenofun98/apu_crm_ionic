import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleEmployeePage} from './single-employee.page';

const routes: Routes = [
  {
    path: '',
    component: SingleEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleEmployeePageRoutingModule {
}
