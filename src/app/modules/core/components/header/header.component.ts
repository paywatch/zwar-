import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  user: any;
  auth: any;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getAuthnication();
  }

  getAuthnication() {
    if (this.user?.user?.apiKey) {
      this.isLoggedIn = true;
    }

    else {
      this.isLoggedIn = false;
    }
  }

  getUser() {
    this.user = JSON.parse(sessionStorage.getItem('user')) || {};
    console.log(this.user);
  }

  logOut() {
    // this.authService.logOut();
    this.router.navigate(['/auth/login']);
    sessionStorage.removeItem('user');
  }
}
