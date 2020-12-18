import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';

import { LoginComponent, ForgotPasswordComponent } from './pages';

const routes: Routes = [
  {
    path: 'auth',
    component: DefaultComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { title: 'Sign in to Nimble' }
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'Enter your email to receive instructions for resetting your password.' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthenticationRoutingModule { }
