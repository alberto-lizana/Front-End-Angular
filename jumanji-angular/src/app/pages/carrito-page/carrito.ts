import { Component } from '@angular/core';
import { Footer } from '../../components/footer/footer';
import { Nav } from '../../components/nav/nav';
import { Carrito } from '../../components/carrito/carrito';

/**
 * @description
 * Componente encargado de organizar la estructura principal de la página,
 * integrando el componente de navegación, el carrito y el
 * pie de página.
 */
@Component({
  selector: 'app-carrito-page',
  standalone: true,
  imports: [Nav, Footer, Carrito],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class CarritoPage {}
