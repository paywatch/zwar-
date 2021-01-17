import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ContainerComponent,
  BasicsComponent,
  ResidentialComponent,
  ResidanceviewComponent,
  TransportaionComponent,
  VisitsComponent,
  ConfirmationComponent,
  CongratulationsComponent,
  ViewprogramComponent,
  EditComponent,
  UpdateComponent,
  ProgramCategoryComponent
} from './components';

const routes: Routes = [
  {
    path: 'basics',
    component: BasicsComponent
  },
  {
    path: 'residential',
    component: ResidentialComponent
  },
  {
    path: 'transportation',
    component: TransportaionComponent
  },
  {
    path: 'visits',
    component: VisitsComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  },
  {
    path: 'congratulation',
    component: CongratulationsComponent
  },
  {
    path: 'view/:programId',
    component: ViewprogramComponent
  },
  {
    path: 'edit',
    component: EditComponent
  },
  {
    path: 'update/:programId',
    component: UpdateComponent
  },
  {
    path: 'programCategory',
    component: ProgramCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgramRoutingModule {
  static components = [
    ContainerComponent,
    BasicsComponent,
    ResidentialComponent,
    ResidanceviewComponent,
    TransportaionComponent,
    VisitsComponent,
    ConfirmationComponent,
    CongratulationsComponent,
    ViewprogramComponent,
    EditComponent,
    UpdateComponent,
    ProgramCategoryComponent
  ];
}
