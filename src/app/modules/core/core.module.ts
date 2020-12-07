import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { CoreRoutingModule } from './core-routing.module';
import { AuthInterceptor, EndPointInterceptor, IdToNumberInterceptor } from './interceptors';
import { UtilsService } from './services/utils/utils.service';
import { AuthService } from './services/auth/auth.service';
import {
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  PlainComponent,
} from './components';
import { CoreService } from './core.service';
import { AuthGuard } from '../agency/auth-gard/auth-gard.service';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    PlainComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    ToastrModule.forRoot({}),
    // ModalModule.forRoot(),
    CoreRoutingModule
  ],
  exports: [
    RouterModule,
    NgHttpLoaderModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EndPointInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: IdToNumberInterceptor,
      multi: true
    },
    UtilsService,
    AuthService,
    CoreService,
    AuthGuard
  ]
})
export class CoreModule { }
