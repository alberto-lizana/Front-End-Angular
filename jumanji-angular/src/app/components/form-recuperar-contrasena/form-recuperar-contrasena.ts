import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';
import { RecuperarContrasenaService } from '../../services/recuperar.contrasena.service'
import { normalizarCampo } from '../../utils/normalizadores';

/**
 * @description
 * Componente encargado de gestionar el formulario de recuperación
 * de contraseña.
 *
 * Utiliza un formulario reactivo para validar la información ingresada,
 * verificar la identidad del usuario y mostrar la contraseña asociada
 * a la cuenta cuando los datos son correctos.
 */
@Component({
  selector: 'app-form-recuperar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-recuperar-contrasena.html',
  styleUrl: './form-recuperar-contrasena.css',
})
export class FormRecuperarContrasena {

  @Output() cerrarModal = new EventEmitter<void>();

  constructor(
    private recuperarContrasenaService: RecuperarContrasenaService
  ) {}

  form = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    appat: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  /**
   * @description
   * Procesa el envío del formulario de recuperación de contraseña.
   *
   * Valida los datos ingresados, normaliza los campos de búsqueda y
   * consulta el servicio correspondiente para verificar la identidad
   * del usuario.
   */
  submit(){
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    
    const formValue = this.form.getRawValue();

    const nombre = normalizarCampo(formValue.nombre)
    const appat =  normalizarCampo(formValue.appat)
    const email =  normalizarCampo(formValue.email)


    const user = this.recuperarContrasenaService.recuperarContrasena(nombre, appat, email );

    if (!user) {
      alert('Usuario no encontrado');
      this.cerrar();
      return;
    }

    alert(user.contrasena);
    this.cerrar();
  }

  /**
   * @description
   * Restablece el formulario y emite el evento para cerrar
   * la ventana modal.
   */
  cerrar(){
    FormUtils.reset(this.form)
    this.cerrarModal.emit();
  }
}

