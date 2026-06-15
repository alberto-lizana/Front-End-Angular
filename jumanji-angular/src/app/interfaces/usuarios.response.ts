import { Admin } from './admin.interface';
import { Usuario } from './usuario.interface';

export interface UsuariosResponse {
  admin: Admin[];
  usuarios: Usuario[];
}
