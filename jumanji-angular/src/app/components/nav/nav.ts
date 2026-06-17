import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
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

  toggleCategorias(event?: Event) {
    event?.stopPropagation();
    this.submenuOpen = !this.submenuOpen;
  }

  toggleMenuResponsive(event?: Event) {
    event?.stopPropagation();

    this.menuResponsiveOpen = !this.menuResponsiveOpen;

    this.submenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    const clickedInsideNav = target.closest('nav');

    if (!clickedInsideNav) {
      this.cerrarTodo();
    }
  }

  scrollTo(id: string) {
    document.getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  cerrarTodo() {
    this.submenuOpen = false;
    this.menuResponsiveOpen = false;
  }

}