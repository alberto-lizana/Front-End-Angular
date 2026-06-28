import { FormGroup } from "@angular/forms";

/**
 * @description
 * Clase utilitaria encargada de restablecer el estado de formularios
 * reactivos utilizados en la aplicación.
 */
export class FormUtils {

  /**
   * @description
   * Restablece un formulario reactivo a su estado inicial.
   *
   * Reinicia los valores del formulario, elimina el estado de modificación
   * (`dirty`), lo marca como no interactuado (`untouched`) y actualiza su
   * estado de validación.
   *
   * @param form Formulario reactivo que se desea reiniciar.
   */
  static reset(form: FormGroup) {
    form.reset();
    form.markAsPristine();
    form.markAsUntouched();
    form.updateValueAndValidity();
  }
}