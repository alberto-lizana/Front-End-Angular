import { Estadisticas } from "./estadisticas.interface";

/**
 * @description
 * Representa un producto.
 */
export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  categoria: string;
  precio: number;
  descuento: number;
  precioFinal: number;
  cantidadJugadores: string;
  duracion: string;
  stock: number;
  dificultad: number;
  estaDisponible: boolean;
  creadoAt: string;
  estadisticasVentas: Estadisticas;
}

  export interface ProductoRequest{
   id?: number;
   nombre: string,
   imagen: string,
   descripcion: string,
   categoria: string,
   precio: number,
   descuento: number,
   precioFinal?: number,
   cantidadJugadores: string,
   duracion: string,
   stock: number,
   dificultad: number,
   estaDisponible?: boolean,
   creadoAt?: string,
   estadisticasVentas?: Estadisticas;
  }
