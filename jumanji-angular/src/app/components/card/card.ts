import { Component, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap, filter } from 'rxjs/operators';
import { ProductoService } from '../../services/producto.service';
import { ProductosResponse } from '../../interfaces/productos.response.interface';
import { Producto } from '../../interfaces/producto.interface';
import { CarritoService } from '../../services/carrito.service';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [Nav, Footer],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  private route = inject(ActivatedRoute);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  agregado = signal<{ [id: number]: boolean }>({});

  productos = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('categoria') as keyof ProductosResponse),
      filter((c): c is keyof ProductosResponse => !!c),
      switchMap(categoria => this.productoService.obtenerProductoCategoria(categoria))
    ),
    { initialValue: [] as Producto[] }
  );

  generarDificultad(dificultad: number) {
    return "⭐".repeat(dificultad) + "☆".repeat(5 - dificultad);
  }

  agregarAlCarrito(juego: Producto): void {
    this.carritoService.agregarAlCarrito(juego);
    this.agregado.set({ ...this.agregado(), [juego.id]: true });
    setTimeout(() => {
      this.agregado.set({ ...this.agregado(), [juego.id]: false });
    }, 1000);
  }
}