import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../../interfaces/usuario.interface';
import { AuthService } from '../../services/auth.service';
import { passwordMatchValidator, validarApellido, validarContrasena, validarEmail, validarNombre } from '../../utils/validaciones-usuario';
import { ModificarUsuarioService } from '../../services/modificar.usuario.service';
import { FormUtils } from '../../utils/form-utils';

/**
 * @description
 * Componente encargado de gestionar el formulario de modificación
 * de los datos del usuario autenticado.
 *
 * Utiliza formularios reactivos para validar la información ingresada,
 * actualizar los datos del usuario y emitir el evento de cierre del
 * formulario modal al finalizar la operación.
 */
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

  /**
   * @description
   * Inicializa el componente obteniendo la información del usuario
   * autenticado para realizar futuras modificaciones.
   */
  ngOnInit(){
    this.dataUsuario = this.authService.getSessionActiva();
  }

  /**
   * @description
   * Procesa el envío del formulario de modificación de usuario.
   *
   * Valida la información ingresada y, si existe una sesión activa,
   * solicita la actualización de los datos mediante el servicio
   * correspondiente.
   */
  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;

    if (!this.dataUsuario) return;

    this.modificarUsuarioService.modificarUsuario(this.form.getRawValue(), this.dataUsuario);
    this.cerrar();
  }

  /**
   * @description
   * Restablece el formulario y emite el evento para cerrar
   * la ventana modal.
   */
  cerrar() {
    FormUtils.reset(this.form);
    this.isOpen.emit();
  }
}