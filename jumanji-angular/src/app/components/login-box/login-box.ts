import { ThemeSwitch } from '../theme-switch/theme-switch';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { normalizarCampo,  } from '../../utils/normalizadores';

/**
 * @description
 * Componente encargado de gestionar el inicio de sesión del usuario,
 * así como la apertura de los formularios de registro y recuperación
 * de contraseña.
 */
@Component({
  selector: 'app-login-box',
  standalone: true,
  imports: [ThemeSwitch, ReactiveFormsModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css',
})
export class LoginBox {

  @Output() abrirCrearUsuario = new EventEmitter<void>();

  @Output() abrirRecuperarUsuario = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authservice: AuthService
  ){}

  form = new FormGroup({
    email: new FormControl('', Validators.required),
    contrasena: new FormControl('', Validators.required)
  });

  /**
   * @description
   * Procesa el envío del formulario de inicio de sesión.
   *
   * Valida el formulario, normaliza los datos ingresados, verifica las
   * credenciales del usuario y redirige a la página correspondiente
   * según su rol.
   */
  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    const { email, contrasena } = this.form.getRawValue() as { email: string; contrasena: string };

    const emailNormalizado = normalizarCampo(email);
    const contrasenaNormalizada = contrasena.trim();

    if (!emailNormalizado || !contrasenaNormalizada) return;

    const user = this.authservice.login(emailNormalizado, contrasenaNormalizada);

    if (!user) return alert('Usuario no encontrado');

    if (user.rol === 'user') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['admin']);
    }
  } 

  /**
   * @description
   * Emite el evento para solicitar la apertura del formulario
   * de creación de usuario.
   */
  abrirCrear() {
    this.abrirCrearUsuario.emit();
  }

  /**
   * @description
   * Emite el evento para solicitar la apertura del formulario
   * de recuperación de contraseña.
   */
  abrirRecuperar() {
    this.abrirRecuperarUsuario.emit();
  }
}
