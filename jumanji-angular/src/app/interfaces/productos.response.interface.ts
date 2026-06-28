import { Producto } from "./producto.interface";

/**
 * @description
 * Representa la estructura de respuesta del JSON de productos,
 * organizado por categorías.
 */
export interface ProductosResponse {
  estrategia: Producto[];
  cooperativos: Producto[];
  rol: Producto[];
  casual: Producto[];
}
