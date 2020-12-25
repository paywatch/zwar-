import {
  Router,
  CanLoad,
  Route,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanLoad {
  user: any;

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (Object.keys(this.user).length === 0 && this.user.constructor === Object) {
      console.log('yes');
      this.router.navigate(['/auth/login']);
      return false;
    }
    else {
      console.log('no');
      return true;
    }
  }
}
