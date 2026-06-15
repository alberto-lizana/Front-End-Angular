import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosResponse } from '../interfaces/productos.response.interface'

@Injectable({ providedIn: 'root' })
export class ProductoService{

  private http = inject(HttpClient);

  rutaProductos = 'assets/JSON/producto/todos.json';

  obtenerProductosJSON() {
    return this.http.get<ProductosResponse>(this.rutaProductos);
  }
}