import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";
import { PresentacionCategoria } from "../interfaces/presentacion.categoria.interface";

/**
 * @description
 * Servicio encargado de proveer datos de categorías de presentación.
 *
 * Su objetivo es centralizar la carga de información desde archivos JSON
 * locales, evitando duplicación de lógica en componentes y aplicando
 * una caché en memoria para optimizar el rendimiento.
 */
@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private categoriasCache: PresentacionCategoria[] | null = null;

  constructor(private http: HttpClient) {}

  /**
   * @description
   * Obtiene la lista de categorías desde un archivo JSON local.
   *
   * Si los datos ya están en caché, los retorna directamente sin realizar
   * una nueva petición HTTP.
   *
   * @returns Observable con un arreglo de categorías.
   */
  getCategorias() {
    if (this.categoriasCache) {
      return of(this.categoriasCache);
    }

    return this.http.get<{Categorias : PresentacionCategoria[]}>('assets/JSON/presentacion-categorias/presentacion.json')
      .pipe(
        map(res => res.Categorias),
        tap(cats => this.categoriasCache = cats)
      );
  }
}