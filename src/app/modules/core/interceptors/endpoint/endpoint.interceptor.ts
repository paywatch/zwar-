import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class EndPointInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const suffix = req.url;
      // if (!suffix.startsWith('http')) {
      //   req = req.clone({
      //     url: environment.endpoint + suffix
      //   });
      // }
    return next.handle(req);
  }
}
