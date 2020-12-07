import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProgramRoutingModule } from './program-routing.module';
import { ProgramService } from './services/program.service';

@NgModule({
  declarations: [
    ...ProgramRoutingModule.components,
  ],
  imports: [
    SharedModule,
    ProgramRoutingModule
  ],
  providers: [
    ProgramService
  ]
})
export class ProgramModule { }
