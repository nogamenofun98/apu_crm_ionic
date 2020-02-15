import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateEmployeePage} from './create-employee.page';

const routes: Routes = [
  {
    path: '',
    component: CreateEmployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEmployeePageRoutingModule {
}
