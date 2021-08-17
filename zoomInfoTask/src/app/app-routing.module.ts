import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [

  { path: 'customers', loadChildren: () => import('./customers/customers-routing.module').
    then(m => m.CustomersRoutingModule)},
  { path: 'users/login', loadChildren: () => import('./auth/login/login.module')
      .then(m => m.LoginModule)},
  { path: 'users/signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule) },
  { path: '**', redirectTo: 'users/login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
