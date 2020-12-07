import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ProfileComponent,
  ProgramsComponent,
  PackagesComponent,
} from './components';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,

  },
  {
    path: 'programs',
    component: ProgramsComponent
  },
  {
    path: 'packages/:programId',
    component: PackagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
  static components = [
    ProfileComponent,
    ProgramsComponent,
    PackagesComponent
  ];
}
