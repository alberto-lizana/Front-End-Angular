import { Producto } from "./producto.interface";

/**
 * @description
 * Representa la estructura de respuesta del JSON de productos,
 * organizado por categorías.
 */
export type ProductosResponse = Record<'ESTRATEGIA' | 'COOPERATIVOS' | 'ROL' | 'CASUAL', Producto[]>;