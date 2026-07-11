import { Producto } from "../interfaces/producto.interface";


export function getProductoMasVendido(productos: Producto[]) {
  if (!productos.length) return null;

  return productos.reduce((best, p) => {
    const bestVentas = best.estadisticasVentas?.unidadesVendidas ?? 0;
    const pVentas = p.estadisticasVentas?.unidadesVendidas ?? 0;
    return pVentas > bestVentas ? p : best;
  });
}

export function getProductoMenosVendido(productos: Producto[]) {
  if (!productos.length) return null;

  return productos.reduce((worst, p) => {
    const worstVentas = worst.estadisticasVentas?.unidadesVendidas ?? 0;
    const pVentas = p.estadisticasVentas?.unidadesVendidas ?? 0;
    return pVentas < worstVentas ? p : worst;
  });
}


export function getProductoMenorStock(productos: Producto[]) {

  if (!productos.length) return null;

  return productos.reduce((min, p) => p.stock < min.stock ? p : min);

}


export function getProductoMayorStock(productos: Producto[]) {

  if (!productos.length) return null;

  return productos.reduce((max, p) =>  p.stock > max.stock ? p : max);

}

export function getProductoMejorRatingPromedio(productos: Producto[]) {
  if (!productos.length) return null;

  return productos.reduce((max, p) => {
    const ratingActual = p.estadisticasVentas?.ratingPromedio ?? 0;
    const ratingMax = max.estadisticasVentas?.ratingPromedio ?? 0;

    return ratingActual > ratingMax ? p : max;
  });
}

export function getProductoPeorRatingPromedio(productos: Producto[]) {
  if (!productos.length) return null;

  return productos.reduce((min, p) => {
    const ratingActual = p.estadisticasVentas?.ratingPromedio ?? 0;
    const ratingMin = min.estadisticasVentas?.ratingPromedio ?? 0;

    return ratingActual < ratingMin ? p : min;
  });
}