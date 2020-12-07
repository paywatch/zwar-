import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// custom validator to check that two fields match
export function emailAvailable(control) {

  if (control.errors && !control.errors.emailAvailable) {
    // return if another validator has already found an error on the matchingControl
    return;
  }

  // set error on matchingControl if validation fails
  return isEmailAvailable(control.value);
}

function isEmailAvailable(email): Observable<any> | null {
  return this.http.get(`/api/ph1/checkEmailAvailability/{$email}`)
    .pipe(map((res: any) => {
      if (res && res.ressult === 'success') {
        return res.avilable === 'No' ? { emailAvailable: true } : null;
      }
      else {
        return null;
      }
    }));
}
