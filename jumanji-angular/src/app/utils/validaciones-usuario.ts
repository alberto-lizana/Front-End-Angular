import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * @description
 * Valida que un nombre contenga únicamente letras y espacios,
 * con una longitud mínima de dos caracteres.
 *
 * Requisitos:
 * - Solo permite letras (incluyendo acentos y la letra ñ).
 * - Permite espacios entre palabras.
 * - Debe contener al menos dos caracteres.
 *
 * @param nombre Nombre que se desea validar.
 * @returns "true" si el nombre cumple el formato, de lo contrario, "false".
 */
export const validarNombre = (nombre: string): boolean => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  return regex.test(nombre);
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
 *
 * @param apellido Apellido que se desea validar.
 * @returns "true" si el apellido cumple el formato, de lo contrario, "false"
 */
export const validarApellido = (apellido: string): boolean => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[-'\s][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
  return regex.test(apellido);
};

/**
 * @description
 * Valida que un correo electrónico tenga un formato válido.
 *
 * Requisitos:
 * - Debe contener un nombre de usuario.
 * - Debe incluir el símbolo @.
 * - El dominio puede contener letras, números, puntos y guiones.
 * - Debe existir un punto antes de la extensión.
 * - La extensión debe estar formada únicamente por letras y tener
 *   al menos dos caracteres.
 *
 * @param email Correo electrónico que se desea validar.
 * @returns true si el correo cumple el formato, de lo contrario, false.
 */
export const validarEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

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
 * @param contrasena Contraseña que se desea validar.
 * @returns true si la contraseña cumple los requisitos, de lo contrario, false.
 * 
 */
export const validarContrasena = (contrasena: string): boolean => {
  const regex = /^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}(?<!\s)$/;
  return regex.test(contrasena);
};

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
