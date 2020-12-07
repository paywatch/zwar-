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
  UpdateComponent
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
    UpdateComponent
  ];
}
