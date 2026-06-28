import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriaService } from '../../services/categoria.service';

/**
 * @description
 * Componente encargado de mostrar las categorías de juegos disponibles.
 *
 * Obtiene la información mediante el servicio de categorías y presenta
 * cada una como una tarjeta interactiva que permite navegar a la
 * sección correspondiente de productos.
 */
@Component({
  selector: 'app-img-categorias',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './img-categorias.html',
  styleUrls: ['./img-categorias.css'],
})
export class ImgCategorias {

  private categoriaService = inject(CategoriaService);

  /**
   * @description
   */
  categorias = toSignal(this.categoriaService.getCategorias(), { initialValue: [] as any[] });
}
