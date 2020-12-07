import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function CheckPhoneNumber(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // console.log(control.value);
        // console.log(matchingControl.value);

        // set error on matchingControl if validation fails
        if ( matchingControl.value && control.value && matchingControl.value === control.value ) {
            matchingControl.setErrors({ checkPhoneNumber: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
