import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function LessThanToday(control) {
  // if (control.errors) {
  //   // return if another validator has already found an error on the matchingControl
  //   return;
  // }

  // set error on matchingControl if validation fails
  if (control.value && ((new Date()).getTime() - (new Date(control.value)).getTime()) < 86400000) {
    return { lessThanToday: true };
  }
  return null;
}
