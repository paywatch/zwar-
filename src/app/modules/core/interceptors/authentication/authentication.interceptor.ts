import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.get('Authorization')) {
      // Get the authorization header from the service.
      const authorizationHeader = this.authService.getAuthorizationHeader();
      if (authorizationHeader) {
        // Clone the request to add the new header.
        const headers = request.headers
                          .set('Authorization', authorizationHeader);
                          // .set('Content-Type', 'application/json');
        const authenticatedRequest
          = request.clone({ headers});
        // Pass on the cloned request instead of the original request.
        return next.handle(authenticatedRequest).pipe(tap((response) => {
        },
          (error) => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                this.authService.forgetToken();
                this.router.navigate(['/auth/login']);
              }
            }
          }));
      }
    }

    return next.handle(request);
  }
}
