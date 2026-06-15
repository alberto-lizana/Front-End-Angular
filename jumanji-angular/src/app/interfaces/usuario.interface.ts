export interface Usuario {
  id: number | null;
  nombre: string;
  appat: string;
  apmat: string;
  email: string;
  contrasena: string;
  r_contrasena: string;
  direccion: string;
  rol: 'user'
}
