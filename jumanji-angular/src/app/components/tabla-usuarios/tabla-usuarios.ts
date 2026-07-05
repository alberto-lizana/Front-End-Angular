import { Component, input } from '@angular/core';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-tabla-usuarios',
  imports: [],
  standalone: true,
  templateUrl: './tabla-usuarios.html',
  styleUrl: './tabla-usuarios.css',
})
export class TablaUsuarios {
  datosUsuarios = input.required<Usuario[]>();
}
