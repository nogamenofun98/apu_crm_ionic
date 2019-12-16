import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {UnauthorisedComponent} from './pages/unauthorised/unauthorised.component';


const routes: Routes = [
        // {
        //     path: '',
        //     redirectTo: 'landing',
        //     pathMatch: 'full'
        // },  // this is comment out and path below is changed to '' because to let all incorrect url redirect back to the home page
        {path: '', loadChildren: './pages/landing/landing.module#LandingPageModule'},
        {path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule'},
        {path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard]},
        {
            path: 'industry-areas',
            loadChildren: './pages/industry-area/industry-area.module#IndustryAreaPageModule', canActivate: [AuthGuard]
        },
        {
            path: 'industry-areas/:id',
            loadChildren: './pages/industry-area/single-area/single-area.module#SingleAreaPageModule', canActivate: [AuthGuard]
        },
        {
            path: 'roles',
            loadChildren: './pages/role/role.module#RolePageModule', canActivate: [AuthGuard]
        },
        {
            path: 'roles/:id',
            loadChildren: './pages/role/single-role/single-role.module#SingleRolePageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'users',
            loadChildren: './pages/user/user.module#UserPageModule', canActivate: [AuthGuard]
        },
        {
            path: 'users/:id',
            loadChildren: './pages/user/single-user/single-user.module#SingleUserPageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'companies',
            loadChildren: './pages/company/company.module#CompanyPageModule',
            canActivate: [AuthGuard]
        },
        {
            path: 'companies/:id',
            loadChildren: './pages/company/single-company/single-company.module#SingleCompanyPageModule',
            canActivate: [AuthGuard]
        },
        {path: 'denied', component: UnauthorisedComponent},
        {path: '**', redirectTo: '/'},

    ]
;

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
