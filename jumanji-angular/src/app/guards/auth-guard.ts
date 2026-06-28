import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * @description
 * Guard encargado de permitir el acceso únicamente a usuarios
 * con una sesión activa.
 *
 * Si no existe una sesión válida, redirige al usuario a la
 * página de inicio de sesión.
 *
 * @returns true si existe una sesión activa, en caso contrario,
 * devuelve un `UrlTree` para redirigir al inicio de sesión.
 */
export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const session = authService.getSessionActiva();

  return session
    ? true
    : router.createUrlTree(['']);
};