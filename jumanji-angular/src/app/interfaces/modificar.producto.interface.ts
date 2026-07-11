export interface ModificarProducto {
  nombre?: string;
  imagen?: string;
  descripcion?: string;
  categoria?: string;
  precio?: number;
  descuento?: number;
  cantidadJugadores?: string;
  duracion?: string;
  stock?: number;
  dificultad?: number;

  unidadesVendidas?: number;
  devoluciones?: number;
  ratingPromedio?: number;
}