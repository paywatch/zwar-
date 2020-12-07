// custom validator to check that Password Contains UpperCase , LowerCase, Number, SpecialCharacter

export function Password(control) {
    // set error on Password if validation fails;
    if (control.value && !(/^(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(control.value))) {
        return { password: true };
    }
    return null;
}
