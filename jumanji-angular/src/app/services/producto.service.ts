import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosResponse } from '../interfaces/productos.response.interface';
import { map, of, tap } from 'rxjs';

/**
 * @description
 * Servicio encargado de proveer acceso a la información de productos
 * desde un archivo JSON local.
 *
 * Implementa una caché en memoria para evitar múltiples lecturas del
 * mismo recurso y expone métodos para obtener todos los productos o
 * filtrarlos por categoría.
 */
@Injectable({ providedIn: 'root' })
export class ProductoService {

  private productosCache: ProductosResponse | null = null; 

  constructor(private http: HttpClient) {}

  /**
   * @description
   * Obtiene la colección completa de productos.
   *
   * Si los productos ya fueron cargados previamente, retorna la información
   * almacenada en la caché para evitar una nueva lectura del archivo JSON.
   *
   * @returns Observable con todos los productos organizados por categoría.
   */  
  obtenerProductosJSON() {
    if (this.productosCache) {
      return of(this.productosCache);  
    }

    return this.http.get<ProductosResponse>('assets/JSON/producto/todos.json').pipe(
      tap(data => this.productosCache = data)  
    );
  }

  /**
   * @description
   * Obtiene los productos pertenecientes a una categoría específica.
   *
   * La información se obtiene a partir de la colección completa de productos,
   * utilizando la caché cuando esta ya se encuentra disponible.
   *
   * @param categoria Categoría de productos que se desea consultar.
   * @returns Observable con los productos de la categoría solicitada.
   */
  obtenerProductoCategoria(categoria: keyof ProductosResponse) {
    return this.obtenerProductosJSON().pipe(
      map(response => response[categoria])
    );
  }
}