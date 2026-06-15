import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validarNombre = (nombre: string): boolean => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  return regex.test(nombre);
};

export const validarApellido = (apellido: string): boolean => {
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:[-'\s][A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
  return regex.test(apellido);
};

export const validarEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validarContrasena = (contrasena: string): boolean => {
  const regex = /^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}(?<!\s)$/;
  return regex.test(contrasena);
};

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('contrasena')?.value;
  const repetir = control.get('r_contrasena')?.value;

  if (!password || !repetir) return null;

  return password === repetir ? null : { passwordMismatch: true };
};
