import { Estadisticas } from "./estadisticas.interface";

export interface VentasFormato {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
    categoria: string;
    precio: number;
    descuento: number;
    estadisticas: Estadisticas
}
