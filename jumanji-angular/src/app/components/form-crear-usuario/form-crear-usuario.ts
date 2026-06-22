import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { validarApellido, validarContrasena, validarEmail, validarNombre, passwordMatchValidator} from '../../utils/validaciones-usuario';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormUtils } from '../../utils/form-utils';
import { CrearUsuarioService } from '../../services/crear.usuario.service';
import { normalizarUsuario } from '../../utils/normalizadores'

@Component({
  selector: 'app-form-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-crear-usuario.html'
})
export class FormCrearUsuario {

  @Output() cerrarModal = new EventEmitter<void>();
  
  constructor(
    private crearUsuarioService: CrearUsuarioService
  ) {}

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, (control) => validarNombre(control.value) ? null : { nombreInvalido: true}]),
    appat: new FormControl('', [Validators.required, (control) => validarApellido(control.value) ? null : {apellidoPaternoInvalido: true}]),
    apmat: new FormControl(''),
    email: new FormControl('', [Validators.required, (control) => validarEmail(control.value) ? null : { emailInvalido: true}]),
    contrasena: new FormControl('', {validators: [Validators.required, (c) => validarContrasena(c.value) ? null : { contrasenaInvalida: true }],updateOn: 'change'}),
    r_contrasena: new FormControl('', {validators: [Validators.required], updateOn: 'change'}),
    direccion: new FormControl('', Validators.required)
  }, {
    validators: [passwordMatchValidator]
});

errorMessages = {
  nombre: {
    required: 'El nombre es obligatorio',
    nombreInvalido: 'Solo letras y espacios (mín. 2 caracteres)'
  },
  appat: {
    required: 'El apellido es obligatorio',
    apellidoPaternoInvalido: 'Solo letras, espacios, guiones o apóstrofes'
  },
  email: {
    required: 'El email es obligatorio',
    emailInvalido: 'Email inválido'
  },
  direccion: {
    required: 'La dirección es obligatoria'
  },
  contrasena: {
    required: 'La contraseña es obligatoria',
    contrasenaInvalida: 'Mín. 8 chars, mayús, minús y símbolo'
  },
  r_contrasena: {
    required: 'La repetición de la contraseña es obligatoria',
    passwordMismatch: 'Las contraseñas no coinciden'
  }
};

  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    
    const formValue = this.form.getRawValue();

    const usuario: Usuario = normalizarUsuario({
      id: Date.now(),
      nombre: formValue.nombre ?? '',
      appat: formValue.appat ?? '',
      apmat: formValue.apmat ?? '',
      email: formValue.email ?? '',
      contrasena: formValue.contrasena ?? '',
      r_contrasena: formValue.r_contrasena ?? '',
      direccion: formValue.direccion ?? '',
      rol: 'user'
    });

    const esExitoso:boolean = this.crearUsuarioService.crearUsuario(usuario);

    if (!esExitoso) {
      alert(`Ya existe cuenta registrada con el mail: ${usuario.email}`);
      this.cerrar();
      return;
    }

    alert('Usuario creado');
    this.cerrar();
  }

  cerrar() {
    FormUtils.reset(this.form);
    this.cerrarModal.emit();
  }
}