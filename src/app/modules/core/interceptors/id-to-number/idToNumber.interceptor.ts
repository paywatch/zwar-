import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IdToNumberInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST' && !request.url.endsWith('oauth/token') && !request.url.endsWith('/upload')) {
      const newBody = {};
      for (const key in request.body) {
        if (key.endsWith('ID')) {
          newBody[key] = Number(request.body[key]);
        }
        else if (key.startsWith('$$')) { }
        else {
          newBody[key] = request.body[key];
        }
      }

      console.log(request, newBody);
      request = request.clone({
        // headers: request.headers,
        body: newBody
      });
    }
    return next.handle(request);
  }
}
