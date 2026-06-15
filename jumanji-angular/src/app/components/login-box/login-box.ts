import { ThemeSwitch } from '../theme-switch/theme-switch';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, EventEmitter, Output } from '@angular/core';


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

  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    const { email, contrasena } = this.form.getRawValue() as { email: string; contrasena: string };

    if (!email || !contrasena) return;

    const user = this.authservice.login(email, contrasena);

    if (!user) return alert('Usuario no encontrado');

    if (user.rol === 'user') {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['home']);
    }
  } 

  abrirCrear() {
    this.abrirCrearUsuario.emit();
  }

  abrirRecuperar() {
    this.abrirRecuperarUsuario.emit();
  }
}
