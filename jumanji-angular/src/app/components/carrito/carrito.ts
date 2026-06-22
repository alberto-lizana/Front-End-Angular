import { Component, inject } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [Nav, Footer],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito {

  private carritoService = inject(CarritoService);
  
  carrito = this.carritoService.carritoActual;

  aumentar(id: number): void {
    this.carritoService.aumentarCantidad(id);
  }

  disminuir(id: number): void {
    this.carritoService.disminuirCantidad(id);
  }

  getTotal(): number {
    return this.carritoService.getTotalCarrito(this.carrito());
  }

  pagar(): void {
    alert(`Compra realizada con éxito\nTotal pagado: $${this.getTotal().toFixed(0)}`);
    this.carritoService.vaciarCarrito();
  }
}