import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function GreaterThan(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        // tslint:disable-next-line:max-line-length
        if (control.value && matchingControl.value && ((new Date(matchingControl.value)).getTime() - (new Date(control.value)).getTime()) <= 86400000 ) {
            matchingControl.setErrors({ greaterThan: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
