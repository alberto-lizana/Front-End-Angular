/**
 * @description
 * Representa a un usuario administrador de la aplicación.
 */
export interface Admin {
    id: number | null;
    nombre: string;
    email: string;
    contrasena: string;
    rol: 'admin';
}
