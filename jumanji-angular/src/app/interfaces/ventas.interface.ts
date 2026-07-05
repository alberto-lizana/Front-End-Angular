import { VentasFormato } from "./venta.formato.interface"

export interface VentasInterface {
    ventas: Record<string, VentasFormato[]>;
}
