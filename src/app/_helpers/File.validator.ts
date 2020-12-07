import { ValidatorFn, FormControl } from '@angular/forms';

export function maxSize(maxFileSize): ValidatorFn {
	// return function (control) {
	// 	const file = control.value;
	// 	console.log(control);
	// 	if (file && file.size > maxFileSize) {
	// 		return { maxSize: true }
	// 	}
	// 	else {
	// 		return null;
	// 	}
	// }
	return null;

}