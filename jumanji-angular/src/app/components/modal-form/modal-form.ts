import { Component, Input, Output, EventEmitter } from '@angular/core';

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