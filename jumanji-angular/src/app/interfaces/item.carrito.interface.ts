/**
 * @description
 * Representa un producto agregado al carrito de compras.
 */
export interface ItemCarrito {
  id: number;
  nombre: string;
  imagen: string;
  precio: number;
  descuento: number;
  cantidad: number;
}