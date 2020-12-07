import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, CanLoad, Route, UrlSegment, UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private router: Router) {
    console.log('constractor...', sessionStorage.getItem('auth'));
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log('can load...');
    const auth = JSON.parse(sessionStorage.getItem('agencyID'));
    // console.log('can load',  auth);
    if (auth) {
      return true;
    }

    else {
      this.router.navigate(['/auth/login']);
    }
  }
}
