import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { Card } from '../../components/card/card';

/**
 * @description
 * Componente encargado de organizar la estructura principal de la página,
 * integrando el componente de navegación, el listado de productos y el
 * pie de página.
 */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [Nav, Footer, Card],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {}
