import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class usernameAvailable implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(null);
  }
}

// // custom validator to check that two fields match
// validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

//   if (control.errors && !control.errors.usernameAvailable) {
//     // return if another validator has already found an error on the matchingControl
//     return;
//   }

//   // set error on matchingControl if validation fails
//   return this._isUsernameAvailable(control.value);
// }

// _isUsernameAvailable(username): Observable<any> | null {
//   // return this.http.get(`/api/ph1/checkUsernameAvailability/{$username}`)
//   //   .pipe(map((res: any) => {
//   //     if (res && res.ressult === 'success') {
//   //       return res.avilable === 'No' ? { usernameAvailable: true } : null;
//   //     }
//   //     else {
//   //     }
//   //   }));
//     return of(null);
// }