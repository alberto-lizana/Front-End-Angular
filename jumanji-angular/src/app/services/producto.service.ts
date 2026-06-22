import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosResponse } from '../interfaces/productos.response.interface';
import { map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductoService {

  private productosCache: ProductosResponse | null = null; 

  constructor(private http: HttpClient) {}

  obtenerProductosJSON() {
    if (this.productosCache) {
      return of(this.productosCache);  
    }

    return this.http.get<ProductosResponse>('assets/JSON/producto/todos.json').pipe(
      tap(data => this.productosCache = data)  
    );
  }

  obtenerProductoCategoria(categoria: keyof ProductosResponse) {
    return this.obtenerProductosJSON().pipe(
      map(response => response[categoria])
    );
  }
}