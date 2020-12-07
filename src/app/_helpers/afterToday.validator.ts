import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function AfterToday(control) {
  // if (control.errors) {
  //   // return if another validator has already found an error on the matchingControl
  //   return;
  // }

  // set error on matchingControl if validation fails
  console.log(control.value ,  (new Date(control.value)).getTime() - (new Date()).getTime());
  console.log(control.value &&  (new Date(control.value)).getTime() < (new Date()).getTime());
  if (control.value && (new Date(control.value)).getTime() < (new Date()).getTime()) {
    return { afterToday: true };
  }
  return null;
}
