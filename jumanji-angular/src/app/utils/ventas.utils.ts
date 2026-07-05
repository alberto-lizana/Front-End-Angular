import { VentasFormato } from "../interfaces/venta.formato.interface";
import { VentasInterface } from "../interfaces/ventas.interface";

export function getProductosVentas(data: VentasInterface | null, categoria?: string): VentasFormato[] {

  if (!data) return [];

  const ventas = data.ventas;

  if (!categoria) {
    return Object.values(ventas).flat();
  }

  return ventas[categoria] ?? [];
}

export function getProductoMasVendido(productos: VentasFormato[]) {
  if (!productos.length) return null;

  return productos.reduce((max, p) =>
    p.estadisticas.unidadesVendidas > max.estadisticas.unidadesVendidas
      ? p
      : max
  );
}

export function getProductoMenosVendido(productos: VentasFormato[]) {
  if (!productos.length) return null;

  return productos.reduce((min, p) =>
    p.estadisticas.unidadesVendidas < min.estadisticas.unidadesVendidas
      ? p
      : min
  );
}

export function getProductoMenorStock(productos: VentasFormato[]) {
  if (!productos.length) return null;

  return productos.reduce((min, p) =>
    p.estadisticas.stock < min.estadisticas.stock
      ? p
      : min
  );
}

export function getProductoMayorStock(productos: VentasFormato[]) {
  if (!productos.length) return null;

  return productos.reduce((max, p) =>
    p.estadisticas.stock > max.estadisticas.stock
      ? p
      : max
  );
}

export function getProductoMejorRatingPromedio(productos: VentasFormato[]) {
  if (!productos.length) return null;

  return productos.reduce((max, p) =>
    p.estadisticas.ratingPromedio > max.estadisticas.ratingPromedio
      ? p
      : max
  );
}

  export function getProductoPeorRatingPromedio(productos: VentasFormato[]) {
    if (!productos.length) return null;
  
    return productos.reduce((min, p) =>
      p.estadisticas.ratingPromedio < min.estadisticas.ratingPromedio
        ? p
        : min
    );
  }
