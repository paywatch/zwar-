import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  token: any;

  constructor() { }

  getToken() {
    if (!this.token) {
      this.token = JSON.parse(sessionStorage.getItem('auth'));
    }
    return this.token;
  }

  setToken(auth) {
    auth.access_token = `Bearer ${auth.access_token}`;
    sessionStorage.setItem('auth', JSON.stringify(auth));
  }

  getAuthorizationHeader() {
    const token = this.getToken();
    if (token) {
      return token.access_token;
    }
    else {
      return null;
    }
  }

  forgetToken() {
    this.token = null;
    sessionStorage.removeItem('auth');
  }
}
