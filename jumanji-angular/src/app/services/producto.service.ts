import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError,  of, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Producto } from '../interfaces/producto.interface';
import { ProductoRequest } from '../interfaces/producto.request.interface';
import { ModificarProducto } from '../interfaces/modificar.producto.interface';

/**
 * @description
 * Servicio encargado de gestionar el acceso a la información de productos
 * mediante peticiones HTTP al backend desarrollado con Spring Boot.
 *
 * Proporciona métodos para obtener todos los productos, filtrarlos por
 * categoría, verificar su existencia y un crud.
 */
@Injectable({ providedIn: 'root' })
export class ProductoService {

  rutaBaseRestAPI= 'https://backend-jumanji-production.up.railway.app/productos';

  private readonly http = inject(HttpClient);
  private refresh = signal(0);

  /**
   * @description
   * Señal que contiene la colección completa de productos obtenida desde el
   * backend.
   *
   * La información se recupera mediante una petición HTTP y se convierte en
   * un `Signal` utilizando "toSignal", permitiendo que los componentes
   * consuman los datos de forma reactiva.
   *
   * Mientras la información aún no se encuentra disponible o ocurre un error,
   * el valor de la señal será "null".
   *
   * @type {Signal<ProductosResponse | null>}
   */

    productos = toSignal(
      toObservable(this.refresh).pipe(
        switchMap(() => this.http.get<Producto[]>(this.rutaBaseRestAPI)),
        catchError(() => of([]))
      ),
      { initialValue: [] }
    );

  /**
   * @description
   * Obtiene los productos pertenecientes a una categoría específica mediante
   * una petición HTTP al backend.
   *
   * La categoría se envía como parámetro de consulta para que el servidor
   * retorne únicamente los productos asociados.
   *
   * @param categoria Categoría de productos que se desea consultar.
   * @returns Observable con la lista de productos pertenecientes a la categoría indicada.
   */
  productosPorCategoria(categoria: string) {
    return this.http.get<Producto[]>(
        this.rutaBaseRestAPI + "/prod-cat",
      {
        params: new HttpParams().set('categoria', categoria)
      }
    );
  }

  productoExiste(nombreProducto:string):boolean {
    const productos = this.productos();
    return productos.some(p => p.nombre.trim().toLowerCase() === nombreProducto.trim().toLowerCase());
  }

  crearProductoPersistente(producto: Producto | ProductoRequest) {
    return this.http.post<Producto>(this.rutaBaseRestAPI, producto).pipe(
      tap(() => this.recargarProductos())
    );
  }

  modificarProducto(productoNuevo: ModificarProducto, productoViejo: Producto | null) {
    return this.http.put(this.rutaBaseRestAPI + `/${productoViejo?.id}`, productoNuevo).pipe(
      tap(() => this.recargarProductos())
    )
  }

  borradoLogico(producto: Producto){
    return this.http.delete<Producto>(this.rutaBaseRestAPI + `/${producto.id}`).pipe(
      tap(() => this.recargarProductos())
    );
  }

  borradoFisico(producto: Producto){
    return this.http.delete<Producto>(this.rutaBaseRestAPI + `/fisico/${producto.id}`).pipe(
      tap(() => this.recargarProductos())
    );
  }

  /**
   * @description
   * Fuerza la recarga de la colección de productos, actualizando el signal `productos`.
   */
  recargarProductos(): void {
    this.refresh.update(n => n + 1);
  }

}