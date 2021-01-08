import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { PackagesComponent } from './components/packages/packages.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
},
{
  path: 'packages',
  component: PackagesComponent
},
{
  path: 'dashboard',
  component: DashboardComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
  static components = [
    HomeComponent,
    PackagesComponent,
    DashboardComponent
  ];
}
