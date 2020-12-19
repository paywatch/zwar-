import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PackageRoutingModule } from './package-routing.module';


@NgModule({
  declarations: [
    ...PackageRoutingModule.components,
  ],
  imports: [
    SharedModule,
    PackageRoutingModule
  ],
  providers: [
  ]
})
export class PackageModule { }
