import { Component } from '@angular/core';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer'
import { Presentacion } from '../../components/presentacion/presentacion';
import { FormModificarUsuario } from '../../components/form-modificar-usuario/form-modificar-usuario';
import { Modal } from '../../components/modal-form/modal-form';
import { Acordeon } from '../../components/acordeon/acordeon';
import { ImgCategorias } from '../../components/img-categorias/img-categorias';

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

  abrirModificar() {
    this.modalType = 'modificar'
    this.isOpen = true;
  }

  cerrarModificar() {
    this.isOpen = false;
  }

}
