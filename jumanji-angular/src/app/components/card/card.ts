import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, filter } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { ProductosResponse } from '../../interfaces/productos.response.interface';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';

/**
 * @description
 * Componente encargado de obtener y mostrar los productos de la categoría
 * seleccionada.
 *
 * Recupera la categoría desde los parámetros de la ruta, consulta el
 * servicio correspondiente para obtener los productos y permite agregarlos
 * al carrito de compras.
 */
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  agregado = signal<{ [id: number]: boolean }>({});

  /**
   * @description
   * Señal que contiene la lista de productos de la categoría seleccionada.
   *
   * La categoría se obtiene desde los parámetros de la ruta y se utiliza
   * para consultar el servicio de productos correspondiente.
   */
  productos = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('categoria') as keyof ProductosResponse),
      filter((c): c is keyof ProductosResponse => !!c),
      switchMap(categoria => this.productoService.obtenerProductoCategoria(categoria))
    ),
    { initialValue: [] as Producto[] }
  );

  /**
   * @description
   * Genera una representación visual de la dificultad del juego mediante
   * estrellas llenas y vacías.
   *
   * @param dificultad Nivel de dificultad del juego (1 a 5).
   * @returns Cadena de texto con estrellas que representan la dificultad.
   */
  generarDificultad(dificultad: number) {
    return "⭐".repeat(dificultad) + "☆".repeat(5 - dificultad);
  }

  /**
   * @description
   * Agrega un juego al carrito de compras y actualiza temporalmente el
   * estado del botón para indicar que el producto fue agregado.
   *
   * @param juego Producto que será agregado al carrito.
   */
  agregarAlCarrito(juego: Producto): void {
    this.carritoService.agregarAlCarrito(juego);
    this.agregado.set({ ...this.agregado(), [juego.id]: true });
    setTimeout(() => {
      this.agregado.set({ ...this.agregado(), [juego.id]: false });
    }, 1000);
  }
}