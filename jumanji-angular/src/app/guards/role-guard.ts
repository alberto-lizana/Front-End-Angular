import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * @description
 * Guard encargado de verificar que el usuario autenticado posea
 * el rol requerido para acceder a una ruta protegida.
 *
 * El rol esperado se obtiene desde la propiedad `data.role`
 * definida en la configuración de la ruta.
 *
 * Si el usuario no posee el rol correspondiente, es redirigido
 * a la página principal de la aplicación.
 *
 * @returns true si el usuario tiene el rol requerido, en caso
 * contrario, devuelve un UrlTree que redirige a /home.
 */
export const roleGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const session = authService.getSessionActiva();
  const requiredRole = route.data['role'];

  if (session && session.rol === requiredRole) {
    return true;
  }

  return router.createUrlTree(['/home']);
};