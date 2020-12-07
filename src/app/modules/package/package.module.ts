import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PackageService } from './services/package-service.service';
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
    PackageService
  ]
})
export class PackageModule { }
