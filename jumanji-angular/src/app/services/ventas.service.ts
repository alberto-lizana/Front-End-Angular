import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentasInterface } from '../interfaces/ventas.interface';
import { toSignal } from '@angular/core/rxjs-interop';

/**
 * @description
 * Servicio encargado de proporcionar Información de ventas desde un archivo JSON remoto.
 * 
 */
@Injectable({ providedIn: 'root' })
export class VentasService {

  private http = inject(HttpClient);

  rutaVentas = 'https://alberto-lizana.github.io/JSON-API/ventas.json';

  ventas = toSignal(
    this.http.get<VentasInterface>(this.rutaVentas),
    { initialValue: null }
  );
}

