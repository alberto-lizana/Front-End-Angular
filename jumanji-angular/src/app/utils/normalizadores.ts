import { Usuario } from '../interfaces/usuario.interface';

export const normalizarCampo = (value: string | undefined | null) =>
  (value ?? '').trim().toLowerCase();

export const normalizarUsuario = (user: Usuario): Usuario => {
  return {
    ...user,
    nombre: user.nombre?.trim().toLowerCase() ?? '',
    appat: user.appat?.trim().toLowerCase() ?? '',
    apmat: user.apmat?.trim().toLowerCase() ?? '',
    email: user.email?.trim().toLowerCase() ?? '',
    contrasena: user.contrasena?.trim() ?? '',
    r_contrasena: user.r_contrasena?.trim() ?? '',
    direccion: user.direccion?.trim().toLowerCase() ?? '',
  };
};

