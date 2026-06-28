import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemeSwitch } from '../theme-switch/theme-switch';
import { AuthService } from '../../services/auth.service';
import { Admin } from '../../interfaces/admin.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { RouterLink } from '@angular/router';

/**
 * @description
 * Componente encargado de mostrar la cabecera de la página del usuario.
 *
 * Presenta las acciones principales relacionadas con la cuenta, como
 * acceder al formulario de modificación de datos, cerrar la sesión,
 * cambiar el tema de la aplicación y, en el caso de un administrador,
 * navegar hacia la vista de administración.
 */
@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [ThemeSwitch, RouterLink],
  templateUrl: './presentacion.html',
  styleUrl: './presentacion.css',
})
export class Presentacion implements OnInit{

  @Output() abrirModificar = new EventEmitter<void>();

  dataUsuario: Usuario | Admin | null = null;

  constructor(
    private authService: AuthService
  ){}

  /**
   * @description
   * Obtiene la información del usuario autenticado
   */
  ngOnInit() {
    this.dataUsuario = this.authService.getSessionActiva();
  }

  /**
   * @description
   * Finaliza la sesión activa del usuario mediante el
   * servicio de autenticación.
   */
  cerrarSesion(){    
    this.authService.logout();
  }

  /**
   * @description
   * Emite el evento para solicitar la apertura del
   * formulario de modificación de usuario.
   */
  abrirModalModificar() {
    this.abrirModificar.emit();
  }
}
