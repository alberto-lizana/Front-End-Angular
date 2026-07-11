import { Producto, ProductoRequest } from '../interfaces/producto.interface';
import { Usuario } from '../interfaces/usuario.interface';

/**
 * @description
 * Normaliza un campo de texto eliminando espacios al inicio y al final,
 * además de convertir su contenido a minúsculas.
 *
 * @param value Valor que se desea normalizar.
 * @returns Cadena normalizada. Si el valor es `null` o `undefined`,
 * retorna una cadena vacía.
 */
export const normalizarCampo = (value: string | undefined | null) =>
  (value ?? '').trim().toLowerCase();

/**
 * @description
 * Normaliza los campos de texto de un usuario para mantener consistencia
 * en la información almacenada.
 *
 * Elimina espacios innecesarios y convierte a minúsculas los campos
 * correspondientes.
 *
 * @param user Usuario que se desea normalizar.
 * @returns Nuevo objeto "Usuario" con los campos normalizados.
 */
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

export const normalizarProducto = (producto: Producto | ProductoRequest): Producto | ProductoRequest => {
  return {
    ...producto,
    nombre: producto.nombre?.trim().toLowerCase() ?? '',
    descripcion: producto.descripcion?.trim().toLowerCase() ?? '',
    categoria: producto.categoria?.trim() ?? '',
    cantidadJugadores: producto.cantidadJugadores?.trim().toLowerCase() ?? '',
    duracion: producto.duracion?.trim() ?? ''
  };
};


