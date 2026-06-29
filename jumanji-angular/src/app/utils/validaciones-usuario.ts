import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description
 * Valida que un nombre contenga únicamente letras y espacios.
 *
 * Requisitos:
 * - Solo permite letras (incluyendo acentos y la letra ñ).
 * - Permite espacios entre palabras.
 * - Debe contener al menos 3 letras (sin contar espacios).
 *
 * @param nombre string | null |undefined
 * @returns true si el nombre cumple el formato, de lo contrario, false.
 *
 * @usageNotes
 * La función espera recibir un nombre previamente normalizado
 * (por ejemplo, con trim y en minúsculas). No realiza la normalización internamente.
 */
export const validarNombre = (nombre: string | null |undefined): boolean => {

  if (!nombre) return false;

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s+[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;

  if (!regex.test(nombre)) return false;

  const soloLetras = nombre.replace(/\s/g, '');

  return soloLetras.length >= 3;
};

/**
 * @description
 * Valida que un apellido tenga un formato válido, permitiendo
 * letras, espacios, guiones y apóstrofos.
 *
 * Requisitos:
 * - Solo permite letras (incluyendo acentos y la letra ñ).
 * - Puede contener espacios, guiones (-) y apóstrofos (').
 * - No permite caracteres especiales distintos de los anteriores.
 * - Debe contener al menos 2 letras (sin contar espacios).
 *
 * @param apellido string | null |undefined que se debe validar.
 * 
 * @returns "true" si el apellido cumple el formato, de lo contrario, "false"
 * 
 * @usageNotes
 * La función espera recibir un nombre previamente normalizado
 * (por ejemplo, con trim y en minúsculas). No realiza la normalización internamente.
 */
export const validarApellido = (apellido: string | null | undefined): boolean => {

  if (!apellido) return false;

  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[-'\s][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;

  if (!regex.test(apellido)) return false;

  return apellido.replace(/[-'\s]/g, '').length >= 2;
}

/**
 * @description
 * Valida que un correo electrónico tenga un formato válido.
 *
 * Requisitos:
 * - Debe contener un nombre de usuario.
 * - Debe incluir el símbolo @.
 * - El dominio puede contener letras, números, puntos y guiones.
 * - Debe existir un punto antes de la extensión.
 * - La extensión debe estar formada únicamente por letras y tener al menos dos caracteres.
 *
 * @param email string | null |undefined que se debe validar.
 * @returns true si el correo cumple el formato, de lo contrario, false.
 */
export const validarEmail = (email: string | null | undefined): boolean => {

  if (!email) return false;

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
}

/**
 * Nota:
 * En una versión futura esta validación podría dividirse en varias
 * funciones independientes para aprovechar mejor los formularios
 * reactivos y mostrar al usuario qué requisito específico de la
 * contraseña no se está cumpliendo.
 */

/**
 * @description
 * Valida que una contraseña cumpla los requisitos mínimos de seguridad
 * establecidos por la aplicación.
 * 
 * Requisitos:
 * - Mínimo 8 caracteres.
 * - Al menos una letra minúscula.
 * - Al menos una letra mayúscula.
 * - Al menos un carácter especial.
 * - No puede comenzar ni terminar con espacios.
 * 
 * @param contrasena string | null |undefined que se debe validar.
 * @returns true si la contraseña cumple los requisitos, de lo contrario, false.
 * 
 */
export const validarContrasena = (contrasena: string | null | undefined): boolean => {

  if (!contrasena) return false;

  const regex = /^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}(?<!\s)$/;

  return regex.test(contrasena);
}

/**
 * @description
 * Validador personalizado para formularios reactivos que verifica
 * que los campos de contraseña y confirmación de contraseña sean iguales.
 *
 * @param control Grupo de controles del formulario que contiene ambas contraseñas.
 * @returns null si las contraseñas coinciden, en caso contrario,
 * retorna el error passwordMismatch.
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('contrasena')?.value;
  const repetir = control.get('r_contrasena')?.value;

  if (!password || !repetir) return null;

  return password === repetir ? null : { passwordMismatch: true };
};
