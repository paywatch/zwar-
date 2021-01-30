import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
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
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }

  logOut() {
    this.authService.logOut();
    localStorage.removeItem('user');
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '100%';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }
}
