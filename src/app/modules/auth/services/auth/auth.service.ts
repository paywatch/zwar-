import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  userCollection: AngularFirestoreCollection<any>;
  user: any;

  constructor(
    private AfAuth: AngularFireAuth,
    private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('user');
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(localStorage.setItem('user', JSON.stringify(userData))),
          err => reject(err));
    });
  }

  register(email: string, password: string, phone: string, name: string) {
    return new Promise((resolve, reject) => {
      this.AfAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(userData => {
          const data = {
            Email: email,
            Password: password,
            phoneNumber: phone,
            displayName: name
          };
          resolve(userData);
          this.userCollection.add(data);
        },
          (err) => reject(err));
    });
  }

  getAuth() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
  }

  isLoggIn(): boolean {
    return !!this.user;
  }

  logOut() {
    return this.AfAuth.auth.signOut();
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
          resolve(localStorage.setItem('user', JSON.stringify(res)));
        }, err => {
          reject(err);
        });
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.FacebookAuthProvider();
      this.AfAuth.auth
        .signInWithPopup(provider)
        .then((res: any) => {
          if (res.credential) {
            const token = res.credential.accessToken;
          }
          resolve(localStorage.setItem('user', JSON.stringify(res)));
        }, err => {
          reject(err);
        });
    });
  }

  doGithubLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GithubAuthProvider();
      this.AfAuth.auth
        .signInWithPopup(provider)
        .then((res: any) => {
          if (res.credential) {
            const token = res.credential.accessToken;
          }
          resolve(localStorage.setItem('user', JSON.stringify(res)));
        }, err => {
          reject(err);
        });
    });
  }
}
