import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  LoginComponent,
  LogoutComponent,
  ForgotPasswordComponent,
  RegisterComponent
} from './components';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    LogoutComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ];
}
