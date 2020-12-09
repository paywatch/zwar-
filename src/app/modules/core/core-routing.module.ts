import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../agency/auth-gard/auth-gard.service';
import { PlainComponent, LayoutComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../landing/landing.module').then((m) => m.LandingModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then((m) => m.ProfileModule),
        // canLoad: [AuthGuard],
      },
      {
        path: 'agency',
        loadChildren: () =>
          import('../agency/agency.module').then((m) => m.AgencyModule),
      },
      {
        path: 'program',
        loadChildren: () =>
          import('../program/program.module').then((m) => m.ProgramModule),
      },
      {
        path: 'package',
        loadChildren: () =>
          import('../package/package.module').then((m) => m.PackageModule),
      },
    ],
  },
  {
    path: '',
    component: PlainComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('../auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
