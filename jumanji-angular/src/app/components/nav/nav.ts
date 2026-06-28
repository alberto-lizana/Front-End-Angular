import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * @description
 * Componente encargado de gestionar la barra de navegación de la aplicación.
 *
 * Controla la apertura y cierre del menú responsive, el submenú de
 * categorías y las interacciones de navegación realizadas por el usuario.
 */
@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  submenuOpen = false;
  menuResponsiveOpen = false;

  /**
   * @description
   * Alterna la visibilidad del submenú de categorías.
   *
   * @param event Evento opcional utilizado para evitar la propagación del clic.
   */
  toggleCategorias(event?: Event) {
    event?.stopPropagation();
    this.submenuOpen = !this.submenuOpen;
  }

  /**
   * @description
   * Alterna la visibilidad del menú de navegación responsive y
   * restablece el estado del submenú de categorías.
   *
   * @param event Evento opcional utilizado para evitar la propagación del clic.
   */
  toggleMenuResponsive(event?: Event) {
    event?.stopPropagation();

    this.menuResponsiveOpen = !this.menuResponsiveOpen;

    this.submenuOpen = false;
  }

  /**
   * @description
   * Detecta clics fuera de la barra de navegación para cerrar
   * automáticamente los menús abiertos.
   *
   * @param event Evento de clic del documento.
   */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const clickedInsideNav = target.closest('nav');

    if (!clickedInsideNav) {
      this.cerrarTodo();
    }
  }

  /**
   * @description
   * Cierra todos los menús de navegación al realizar
   * una acción de navegación.
   */
  onNavigate() {
    this.cerrarTodo();
  }

  /**
   * @description
   * Desplaza la página suavemente hasta el elemento indicado.
   *
   * @param id Identificador del elemento de destino.
   */
  scrollTo(id: string) {
    document.getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  /**
   * @description
   * Cierra el menú responsive y el submenú de categorías.
   */
  cerrarTodo() {
    this.submenuOpen = false;
    this.menuResponsiveOpen = false;
  }
}