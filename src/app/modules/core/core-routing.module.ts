import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../agency/auth-gard/auth-gard.service';
import { PlainComponent, LayoutComponent } from './components';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';

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
        canLoad: [AuthGuard]
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
export class CoreRoutingModule { }
