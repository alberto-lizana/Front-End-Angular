import { FormGroup } from "@angular/forms";

export class FormUtils {
  static reset(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    form.updateValueAndValidity();
  }
}