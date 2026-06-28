import { Component, Input } from '@angular/core';

/**
 * @description
 * Es un componente modal que define una estructura visual (tipo card con animación) 
 * y proyecta contenido dinámico en su interior, normalmente formularios, manteniendo consistencia de estilos.
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal-form.html',
  styleUrl: './modal-form.css',
})
export class Modal {
  // El padre (quien use <app-modal>) controla si está abierto o no
  @Input() isOpen = false;

  @Input() titulo = '';
  @Input() comentario = '';

}