import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SingleRolePage} from './single-role.page';

const routes: Routes = [
    {
        path: '',
        component: SingleRolePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SingleRolePageRoutingModule {
}
