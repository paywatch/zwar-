import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { LandingRoutingModule } from './landing-routing.module';


@NgModule({
  declarations: [
    LandingRoutingModule.components,
  ],
  imports: [
    SharedModule,
    LandingRoutingModule,
  ]
})
export class LandingModule { }
