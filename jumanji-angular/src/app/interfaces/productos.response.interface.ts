import { Producto } from "./producto.interface";

export interface ProductosResponse {
  estrategia: Producto[];
  cooperativos: Producto[];
  rol: Producto[];
  casual: Producto[];
}
