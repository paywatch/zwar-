import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authSerive: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.authSerive.isloggin) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    else {
      return true;
    }
  }
}
