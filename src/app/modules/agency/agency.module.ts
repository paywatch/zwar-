import { NgModule } from '@angular/core';

import { AgencyRoutingModule } from './agency-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    ...AgencyRoutingModule.components,
  ],
  imports: [
    SharedModule,
    AgencyRoutingModule,
    DialogModule,
    TableModule,
    ConfirmDialogModule,
  ],
  // providers: [
  //   {
  //     provide: NG_ASYNC_VALIDATORS,
  //     useExisting: usernameAvailable,
  //     multi: true
  //   }
  // ]
})
export class AgencyModule { }
