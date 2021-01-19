import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  BaseComponent,
  GroupComponent,
  RoomDataComponent,
  ConfirmationComponent,
  CongratulateComponent,
  ViewComponent,
  EditComponent,
  UpdateComponent,
  UmrahSeasonComponent,
  UmrahDirectionComponent,
  InternalAirportComponent,
  RoomTypeComponent
} from './components';

const routes: Routes = [
  {
    path: 'base/:programId',
    component: BaseComponent
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'room-data',
    component: RoomDataComponent
  },
  {
    path: 'confirm',
    component: ConfirmationComponent
  },
  {
    path: 'congratulate',
    component: CongratulateComponent
  },
  {
    path: 'view/:id',
    component: ViewComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'internal-airport',
    component: InternalAirportComponent
  },
  {
    path: 'umrah-season',
    component: UmrahSeasonComponent
  },
  {
    path: 'umrah-direction',
    component: UmrahDirectionComponent
  },
  {
    path: 'room-type',
    component: RoomTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackageRoutingModule {
  static components = [
    BaseComponent,
    GroupComponent,
    RoomDataComponent,
    ConfirmationComponent,
    CongratulateComponent,
    ViewComponent,
    EditComponent,
    UpdateComponent,
    UmrahSeasonComponent,
    UmrahDirectionComponent,
    InternalAirportComponent,
    RoomTypeComponent
  ];
}
