import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function postLengthValidator(): ValidatorFn {
  const minLength = 1;
  const maxLength = 280;

  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && (control.value.length < minLength || control.value.length > maxLength)) {
      return {
        postLength: true,
        message: `Le post doit contenir entre ${minLength} et ${maxLength} caractères.`,
      };
    }

    return null;
  };
}
