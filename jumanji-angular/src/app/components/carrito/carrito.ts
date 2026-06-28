import { Component, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
/**
 * @description
 * Componente encargado de mostrar y gestionar el carrito de compras del usuario.
 * Permite aumentar/disminuir cantidades, calcular el total y realizar el pago.
 *
 * @remarks
 * Este componente consume el `CarritoService` para manejar el estado global del carrito.
 */
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

  private carritoService = inject(CarritoService);
  
  carrito = this.carritoService.carritoActual;

  /**
  * @description
  * Incrementa la cantidad de un producto en el carrito.
  *
  * @param id - Identificador único del producto.
  */
  aumentar(id: number): void {
    this.carritoService.aumentarCantidad(id);
  }

  /**
  * @description
  * Disminuye la cantidad de un producto en el carrito.
  * Si la cantidad llega a 0, el producto puede ser eliminado.
  *
  * @param id - Identificador único del producto.
  */
  disminuir(id: number): void {
    this.carritoService.disminuirCantidad(id);
  }

  /**
  * @description
  * Calcula el total del carrito aplicando descuentos.
  *
  * @returns Total final a pagar.
  */
  getTotal(): number {
    return this.carritoService.getTotalCarrito(this.carrito());
  }

  /**
  * @description
  * Simula el proceso de pago del carrito.
  * Muestra un mensaje con el total y vacía el carrito.
  */
  pagar(): void {
    alert(`Compra realizada con éxito\nTotal pagado: $${this.getTotal().toFixed(0)}`);
    this.carritoService.vaciarCarrito();
  }
}