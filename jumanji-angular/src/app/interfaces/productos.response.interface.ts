import { Producto } from "./producto.interface";

export interface ProductosResponse {
  Estrategia: Producto[];
  Cooperativos: Producto[];
  Rol: Producto[];
  Casual: Producto[];
}
