import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  user: any;
  auth: any;

  constructor() {}

  ngOnInit(): void {
    this.getUser();
    this.getAuthnication();
  }

  getAuthnication() {
    if(sessionStorage.getItem('auth')) {
      this.auth = JSON.parse(sessionStorage.getItem('auth'));
    }

    else{
      this.auth = {};
    }

    if (this.auth.access_token) {
      this.isLoggedIn = true;
    }

    else {
      this.isLoggedIn = false;
    }
  }

  getUser() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
}
