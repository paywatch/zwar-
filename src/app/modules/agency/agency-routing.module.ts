import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  MainComponent,
  LicenseComponent,
  RegisterComponent,
  VerifyComponent,
  BranchesComponent,
  DisplayComponent,
  ReviewComponent,
  CongratulationsComponent,
  EditComponent,
  UpdateComponent,
  RequestlistComponent,
  ViewRequestComponent
} from './components';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'verify/:id',
    component: VerifyComponent,
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'license',
    component: LicenseComponent,
  },
  {
    path: 'branches',
    component: BranchesComponent,
  },
  {
    path: 'display',
    component: DisplayComponent,
  },
  {
    path: 'review/:id',
    component: ReviewComponent,
  },
  {
    path: 'congratulations',
    component: CongratulationsComponent,
  },
  {
    path: 'edit',
    component: EditComponent,
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'request-list',
    component: RequestlistComponent
  },
  {
    path: 'view-request/:id',
    component: ViewRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule {
  static components = [
    MainComponent,
    LicenseComponent,
    RegisterComponent,
    VerifyComponent,
    BranchesComponent,
    DisplayComponent,
    ReviewComponent,
    CongratulationsComponent,
    EditComponent,
    UpdateComponent,
    RequestlistComponent,
    ViewRequestComponent
  ];
}
