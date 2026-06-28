import { Injectable, signal } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { ItemCarrito } from '../interfaces/item.carrito.interface';
/**
 * @description
 * Servicio encargado de gestionar la lógica del carrito de compras.
 *
 * Permite agregar, modificar, eliminar y calcular el total de productos
 * almacenados en el carrito del usuario.
 *
 * Utiliza Signals para mantener un estado reactivo del carrito,
 * sincronizado con LocalStorage.
 * 
 * El carrito se persiste en LocalStorage y se asocia a cada usuario
 * mediante una clave única basada en su sesión activa.
 */
@Injectable({ providedIn: 'root' })
export class CarritoService {

  private carrito = signal<ItemCarrito[]>(this.cargarCarrito());
  
  carritoActual = this.carrito.asReadonly();

  /**
   * @description
   * Genera la clave del carrito asociada al usuario autenticado.
   *
   * Requiere que exista una sesión activa.
   *
   * @returns Clave en formato carrito_<userId>.
   */
  private getClaveCarrito(): string {
    const sesion = JSON.parse(sessionStorage.getItem('sesion') || 'null');
    return `carrito_${sesion?.user?.id}`;
  }

  /**
   * @description
   * Obtiene el carrito de compras del usuario desde el LocalStorage.
   *
   * @returns Lista de productos del carrito. Si no existe información,
   * retorna un arreglo vacío.
   */
  private cargarCarrito(): ItemCarrito[] {
    const clave = this.getClaveCarrito();
    return JSON.parse(localStorage.getItem(clave) || '[]');
  }

  /**
   * @description
   * Guarda el carrito del usuario en el LocalStorage y actualiza el estado reactivo.
   *
   * @param carrito Array de productos del carrito a almacenar.
   */
  private guardarCarrito(carrito: ItemCarrito[]): void {
    const clave = this.getClaveCarrito();
    localStorage.setItem(clave, JSON.stringify(carrito));
    this.carrito.set(carrito);
  }

  /**
   * @description
   * Agrega un producto al carrito del usuario. Si el producto ya existe,
   * incrementa su cantidad; de lo contrario, lo añade como un nuevo ítem.
   *
   * El carrito se sincroniza inmediatamente con el LocalStorage.
   *
   * @param juego Producto que se desea agregar al carrito.
   */
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

  /**
   * @description
   * Incrementa la cantidad de un producto existente en el carrito.
   *
   * Sincroniza el estado del carrito con el almacenamiento local.
   *
   * @param id Identificador del producto a actualizar.
   */
  aumentarCantidad(id: number): void {
    const carrito = this.cargarCarrito();
    const producto = carrito.find(p => p.id === id);
    if (producto) producto.cantidad++;
    this.guardarCarrito(carrito);
  }

  /**
   * @description
   * Disminuye la cantidad de un producto existente en el carrito. (lo borra si es < 1)
   *
   * Sincroniza el estado del carrito con el almacenamiento local.
   * 
   * @param id Identificador del producto a actualizar.
   */
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

/**
 * @description
 * Vacía completamente el carrito del usuario.
 *
 * Elimina todos los productos almacenados y sincroniza
 * el estado del carrito en la aplicación.
 */
  vaciarCarrito(): void {
    this.guardarCarrito([]);
  }

  /**
   * @description
   * Calcula el total a pagar del carrito de compras.
   *
   * Aplica el descuento de cada producto y multiplica por la cantidad.
   *
   * @param carrito Array de productos del carrito.
   * @returns Total final a pagar.
   */
  getTotalCarrito(carrito: ItemCarrito[]): number {
    return carrito.reduce((total, item) => {
      return total + ((item.precio - (item.precio * item.descuento)) * item.cantidad);
    }, 0);
  }
}