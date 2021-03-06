import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { LoginComponent } from './admin/pages/login/login.component';
import { UserComponent } from './admin/pages/user/user.component';
import { RegisterComponent } from './admin/pages/register/register.component';
import { GuestComponent } from './layouts/guest/guest.component';
import { AuthGuard } from "./shared/auth.guard";
import { ProfileComponent } from './admin/pages/profile/profile.component';

const routes: Routes = [

  // {
  //   path: 'login', component: GuestComponent,
  //   children: [
  //     {
  //       path: 'login',
  //       redirectTo: '/login',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'login',
  //       loadChildren: () => import('./guest/guest.module').then(m => m.GuestModule)
  //     }
  //   ]
  // },

  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }

  // { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
