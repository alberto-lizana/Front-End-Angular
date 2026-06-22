import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator, validarApellido, validarContrasena, validarEmail, validarNombre } from '../../utils/validaciones-usuario';
import { ModificarUsuarioService } from '../../services/modificar.usuario.service';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-form-modificar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-modificar-usuario.html',
  styleUrl: './form-modificar-usuario.css',
})

export class FormModificarUsuario implements OnInit {

  @Output() isOpen = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private modificarUsuarioService: ModificarUsuarioService
  ){}

  dataUsuario: Usuario | null = null

form = new FormGroup({
  nombre: new FormControl('', [(control) => !control.value || validarNombre(control.value) ? null : { nombreInvalido: true }]),
  appat: new FormControl('', [(control) => !control.value || validarApellido(control.value) ? null : { apellidoPaternoInvalido: true }]),
  apmat: new FormControl('', [(control) => !control.value || validarApellido(control.value) ? null : { apellidoMaternoInvalido: true }]),
  email: new FormControl('', [(control) => !control.value || validarEmail(control.value) ? null : { emailInvalido: true }]),
  direccion: new FormControl(''),
  contrasena: new FormControl('', {validators: [(control) => !control.value || validarContrasena(control.value) ? null : { contrasenaInvalida: true }], updateOn: 'change'}),
  r_contrasena: new FormControl('')
}, 
  {validators:[passwordMatchValidator]}
);

  ngOnInit(){
    this.dataUsuario = this.authService.getSessionActiva();
  }

  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    if (!this.dataUsuario) return;

    this.modificarUsuarioService.Modificar(this.form.getRawValue(), this.dataUsuario);
    this.cerrar();
  }

  cerrar() {
    FormUtils.reset(this.form);
    this.isOpen.emit();
  }
}