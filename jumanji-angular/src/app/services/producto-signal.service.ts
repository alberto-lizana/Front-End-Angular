import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosResponse } from '../interfaces/productos.response.interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, of } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({ providedIn: 'root' })
export class ProductoSignalService {

  private http = inject(HttpClient);

  rutaProductos = 'https://alberto-lizana.github.io/JSON-API/productos.json'

  productos = toSignal(
    this.http.get<ProductosResponse>(this.rutaProductos).pipe(
        catchError(() => of(null))
    ),
    { initialValue: null}
  )
}
