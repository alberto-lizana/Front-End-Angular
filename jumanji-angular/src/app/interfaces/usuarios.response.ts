import { Admin } from './admin.interface';
import { Usuario } from './usuario.interface';

/**
 * @description
 * Representa la estructura de respuesta del JSON de usuarios,
 * separando administradores y usuarios normales.
 */

export interface UsuariosResponse {
  admin: Admin[];
  usuarios: Usuario[];
}
