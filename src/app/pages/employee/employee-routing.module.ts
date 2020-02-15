import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EmployeePage} from './employee.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {
}
