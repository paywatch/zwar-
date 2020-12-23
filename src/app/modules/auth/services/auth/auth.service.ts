import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import firebase from 'firebase/app';

@Injectable()
export class AuthService {

  userCollection: AngularFirestoreCollection<any>;
  user: any;

  constructor(
    private AfAuth: AngularFireAuth) {
  }

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

  getAuth() {
    this.user = JSON.parse(sessionStorage.getItem('user')) || {};
    console.log(this.user);
  }

  isloggin() {
    return !!this.user;
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

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.AfAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(sessionStorage.setItem('user', JSON.stringify(res)));
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.AfAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          if (res.credential) {
            const token = res.credential.accessToken;
          }
          resolve(sessionStorage.setItem('user', JSON.stringify(res)));
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

}
