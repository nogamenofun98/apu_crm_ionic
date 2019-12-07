import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleUserPage} from './single-user.page';

const routes: Routes = [
  {
    path: '',
    component: SingleUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleUserPageRoutingModule {
}
