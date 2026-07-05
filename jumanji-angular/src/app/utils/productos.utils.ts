import { Producto } from "../interfaces/producto.interface";
import { ProductosResponse } from "../interfaces/productos.response.interface";

export function getProductos(data: ProductosResponse | null, categoria?: keyof ProductosResponse): Producto[] {
  if (!data) return [];

  if (!categoria) {
    return Object.values(data).flat();
  }

  return data[categoria];
}

  /**
   * @description
   * Genera una representación visual de la dificultad del juego mediante
   * estrellas llenas y vacías.
   *
   * @param dificultad Nivel de dificultad del juego (1 a 5).
   * @returns Cadena de texto con estrellas que representan la dificultad.
   */
  export function generarDificultad(dificultad: number) {
    return "⭐".repeat(dificultad) + "☆".repeat(5 - dificultad);
  }