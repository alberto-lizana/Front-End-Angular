import { Usuario } from '../interfaces/usuario.interface'

/**
 * @description
 * Verifica si un correo electrónico ya se encuentra registrado
 * dentro de una colección de usuarios.
 *
 * @param email Correo electrónico que se desea buscar.
 * @param usuarios Colección de usuarios donde se realizará la búsqueda.
 * @returns "true" si el correo ya existe, de lo contrario, "false".
 */
export function emailExiste(email: string, usuarios: Usuario[] | []): boolean {
    return usuarios.some(u => u.email === email);
  }