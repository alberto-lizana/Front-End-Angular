export interface Producto {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  categoria: string;
  precio: number;
  descuento: number;
  precio_final: number | null;
  cant_jugadores: string;
  duracion: string;
  dificultad: number;
}