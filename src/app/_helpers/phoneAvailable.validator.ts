import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// custom validator to check that two fields match
export function phoneAvailable(control) {

  if (control.errors && !control.errors.phoneAvailable) {
    // return if another validator has already found an error on the matchingControl
    return;
  }

  // set error on matchingControl if validation fails
  return isPhoneAvailable(control.value);
}

function isPhoneAvailable(phone): Observable<any> | null {
  return this.http.get(`/api/ph1/checkMobileAvailability/{$phone}`)
    .pipe(map((res: any) => {
      if (res && res.ressult === 'success') {
        return res.avilable === 'No' ? { phoneAvailable: true } : null;
      }
      else {
        return null;
      }
    }));
}
