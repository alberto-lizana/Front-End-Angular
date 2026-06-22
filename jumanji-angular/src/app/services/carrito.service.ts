import { Injectable, signal } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ItemCarrito } from '../interfaces/item.carrito.interface';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private carrito = signal<ItemCarrito[]>(this.cargarCarrito());
  
  carritoActual = this.carrito.asReadonly();

    private getClaveCarrito(): string {
    const sesion = JSON.parse(sessionStorage.getItem('sesion') || 'null');
    return `carrito_${sesion?.user?.id}`;
    }

  private cargarCarrito(): ItemCarrito[] {
    const clave = this.getClaveCarrito();
    return JSON.parse(localStorage.getItem(clave) || '[]');
  }

    private guardarCarrito(carrito: ItemCarrito[]): void {
    const clave = this.getClaveCarrito();
    localStorage.setItem(clave, JSON.stringify(carrito));
    this.carrito.set(carrito);
    }

    agregarAlCarrito(juego: Producto): void {
    const carrito = this.cargarCarrito();
    const existente = carrito.find(item => item.id === juego.id);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
        id: juego.id,
        nombre: juego.nombre,
        imagen: juego.imagen,
        precio: juego.precio,
        descuento: juego.descuento,
        cantidad: 1
        });
    }
    this.guardarCarrito(carrito);
    }

  aumentarCantidad(id: number): void {
    const carrito = this.cargarCarrito();
    const producto = carrito.find(p => p.id === id);
    if (producto) producto.cantidad++;
    this.guardarCarrito(carrito);
  }

  disminuirCantidad(id: number): void {
    let carrito = this.cargarCarrito();
    const producto = carrito.find(p => p.id === id);
    if (producto) {
      producto.cantidad--;
      if (producto.cantidad <= 0) {
        carrito = carrito.filter(p => p.id !== id);
      }
    }
    this.guardarCarrito(carrito);
  }

  vaciarCarrito(): void {
    this.guardarCarrito([]);
  }

  getTotalCarrito(carrito: ItemCarrito[]): number {
    return carrito.reduce((total, item) => {
      return total + ((item.precio - (item.precio * item.descuento)) * item.cantidad);
    }, 0);
  }
}