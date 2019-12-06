import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CreateRolePage} from './create-role.page';

const routes: Routes = [
    {
        path: '',
        component: CreateRolePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CreateRolePageRoutingModule {
}
