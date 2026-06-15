import { Usuario } from '../interfaces/usuario.interface'

export function emailExiste(email: string, usuarios: Usuario[] | []): boolean {
    return usuarios.some(u => u.email === email);
  }