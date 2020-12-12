import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { resolve } from 'dns';

import { AuthService as CoreService } from '../../../core/services/auth/auth.service';


@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private AfAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(sessionStorage.setItem('user', JSON.stringify(userData))),
          err => reject(err));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => resolve(userData),
          err => reject(err));
    });
  }

  logOut() {
    this.AfAuth.auth.singOut();
  }

  resetPassword(email) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.sendPasswordResetEmail(email)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  changePassword(payload) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.currentUser.updatePassword(payload).then(data => resolve(data), err => reject(err));
    });
  }
}


