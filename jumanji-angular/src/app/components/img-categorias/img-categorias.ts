import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-img-categorias',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './img-categorias.html',
  styleUrls: ['./img-categorias.css'],
})
export class ImgCategorias {

  private categoriaService = inject(CategoriaService);

  categorias = toSignal(this.categoriaService.getCategorias(), { initialValue: [] as any[] });
}
