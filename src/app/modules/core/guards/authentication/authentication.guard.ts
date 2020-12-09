import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, Router, Route, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    if (this.authenticationService.getAuthorizationHeader()) {
      return true;
    }
    else {
      this.router.navigate(['/users/login']);
      return false;
    }
  }
}
