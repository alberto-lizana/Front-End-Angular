import { Producto } from "../interfaces/producto.interface";

export function getProductos(productos: Producto[], categoria?: string): Producto[] {

    if (!categoria) 
      return productos.filter(p => p.estaDisponible === true);

    return productos.filter(
        p => p.categoria === categoria && p.estaDisponible === true
    );
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