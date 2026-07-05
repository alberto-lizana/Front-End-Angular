import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { DivisaInterface } from '../interfaces/divisa.interface';
import { catchError, of } from 'rxjs';

/**
 * @description
 * Servicio encargado de proporcionar Información del dolar a través de una API pública.
 * 
 */
@Injectable({ providedIn: 'root' })
export class DivisaService {

  private http = inject(HttpClient);

  rutaDolar = 'https://cl.dolarapi.com/v1/cotizaciones/usd';
  rutaEuro = 'https://cl.dolarapi.com/v1/cotizaciones/eur';
  rutaReal = 'https://cl.dolarapi.com/v1/cotizaciones/brl';
  rutaPesoArgentino = 'https://cl.dolarapi.com/v1/cotizaciones/ars';
  rutaPesoUruguayo = 'https://cl.dolarapi.com/v1/cotizaciones/uyu';

  dolar = toSignal(
    this.http.get<DivisaInterface>(this.rutaDolar).pipe(
      catchError(() => of(null))
    ),
    { initialValue: null }
  );

  euro = toSignal( 
    this.http.get<DivisaInterface>(this.rutaEuro).pipe(
      catchError(() => of(null))
    ),
    { initialValue: null }
  );

  real = toSignal(
    this.http.get<DivisaInterface>(this.rutaReal).pipe(
      catchError(() => of(null))
    ),
    { initialValue: null }
  )

  pesoArgentino = toSignal(
    this.http.get<DivisaInterface>(this.rutaPesoArgentino).pipe(
      catchError(() => of(null))
    ),
      { initialValue: null }
  )

  pesoUruguayo = toSignal(
    this.http.get<DivisaInterface>(this.rutaPesoUruguayo).pipe(
      catchError(() => of(null))
    ),
    { initialValue: null }
  )
}

