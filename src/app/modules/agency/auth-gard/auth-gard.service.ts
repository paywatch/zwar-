import {
  Router,
  CanActivate
} from '@angular/router';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthGuard implements CanActivate {
  user: any;

  constructor(private router: Router, private toast: ToastrService) {
  }
  canActivate(): boolean {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (this.user) {
      return true;
    }
    else {
      this.router.navigate(['/auth/login']);
      this.toast.warning('قم بتسجيل الدخول');
      return false;
    }
  }
}
