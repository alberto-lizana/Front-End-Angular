import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer'
import { Presentacion } from '../../components/presentacion/presentacion';
import { FormModificarUsuario } from '../../components/form-modificar-usuario/form-modificar-usuario';
import { Modal } from '../../components/modal-form/modal-form';
import { Acordeon } from '../../components/acordeon/acordeon';
import { ImgCategorias } from '../../components/img-categorias/img-categorias';

/**
 * @description
 * Componente principal de la página home para usuarios autenticados.
 *
 * Orquesta los distintos componentes que conforman la interfaz,
 * como la barra de navegación, la presentación del usuario,
 * las categorías de juegos, el acordeón informativo, el pie de
 * página y el formulario modal para modificar los datos del usuario.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Nav, Footer, Presentacion, Modal, FormModificarUsuario, Acordeon, ImgCategorias],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  isOpen = false;
  modalType: string | null = null;

  /**
   * @description
   * Abre la ventana modal del formulario de modificación de usuario.
   */
  abrirModificar() {
    this.modalType = 'modificar'
    this.isOpen = true;
  }

  /**
   * @description
   * Cierra la ventana modal del formulario de modificación de usuario.
   */
  cerrarModificar() {
    this.isOpen = false;
  }
}
