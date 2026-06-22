import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, of, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class CategoriaService {

  private categoriasCache: any[] | null = null;

  constructor(private http: HttpClient) {}

  getCategorias() {
    if (this.categoriasCache) {
      return of(this.categoriasCache);
    }

    return this.http.get<any>('assets/JSON/presentacion-categorias/presentacion.json')
      .pipe(
        map(res => res.Categorias),
        tap(cats => this.categoriasCache = cats)
      );
  }
}