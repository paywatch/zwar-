import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth/auth.service';


@NgModule({
  declarations: [
    ...AuthRoutingModule.components,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
