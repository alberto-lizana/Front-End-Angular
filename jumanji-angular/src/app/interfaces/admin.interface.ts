export interface Admin {
    id: number | null;
    nombre: string;
    email: string;
    contrasena: string;
    rol: 'admin';
}
