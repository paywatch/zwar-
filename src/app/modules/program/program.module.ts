import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProgramRoutingModule } from './program-routing.module';

@NgModule({
  declarations: [
    ...ProgramRoutingModule.components,
  ],
  imports: [
    SharedModule,
    ProgramRoutingModule
  ],
  providers: [
  ]
})
export class ProgramModule { }
