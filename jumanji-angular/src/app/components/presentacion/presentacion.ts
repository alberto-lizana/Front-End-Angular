import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../interfaces/admin.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [ThemeSwitch, RouterLink],
  templateUrl: './presentacion.html',
  styleUrl: './presentacion.css',
})
export class Presentacion {

  @Output() abrirModificar = new EventEmitter<void>();

  dataUsuario: Usuario | Admin | null = null;

  constructor(
    private authService: AuthService
  ){}

  ngOnInit() {
    this.dataUsuario = this.authService.getSessionActiva();
  }

  cerrarSesion(){    
    this.authService.logout();
  }

  abrirModalModificar() {
    this.abrirModificar.emit();
  }

}
