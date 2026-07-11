import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { generarDificultad } from '../../utils/productos.utils';

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
  generarDificultad = generarDificultad;

  agregado = signal<{ [id: number]: boolean }>({});

  /**
   * @description
   * Señal reactiva que contiene la lista de productos correspondiente a la
   * categoría seleccionada.
   *
   * La categoría se obtiene desde los parámetros de la ruta (`paramMap`) y,
   * cada vez que cambia, se realiza automáticamente una nueva solicitud al
   * servicio para recuperar los productos asociados. El resultado del
   * `Observable` se convierte en un `Signal` mediante `toSignal`, permitiendo
   * que la vista se actualice de forma reactiva.
   *
   * Mientras la solicitud aún no finaliza o no existe una categoría válida,
   * el valor inicial de la señal será un arreglo vacío.
   */
  productos = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('categoria')),
      filter((c): c is string => !!c),
      tap(categoria => console.log('Categoría enviada:', categoria)),
      switchMap(categoria =>
        this.productoService.productosPorCategoria(categoria)
      )
    ),
    { initialValue: [] }
  );

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