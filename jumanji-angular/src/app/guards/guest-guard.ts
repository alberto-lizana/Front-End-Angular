import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

/**
 * @description
 * Guard encargado de impedir que un usuario con una sesión activa
 * acceda nuevamente a las páginas de autenticación.
 *
 * Si existe una sesión iniciada, el usuario es redirigido a `/home`.
 * En caso contrario, se permite el acceso a la ruta solicitada.
 *
 * @returns true si no existe una sesión activa, en caso contrario,
 * devuelve un UrlTree que redirige al usuario a /home.
 */

export const guestGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const session = authService.getSessionActiva();

  if (session) {
    return router.createUrlTree(['/home']);
  }

  return true;
};