import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';
import { RecuperarContrasenaService } from '../../services/recuperar.contrasena.service'

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

  submit(){
    this.form.updateValueAndValidity();
    if (this.form.invalid) return;
    
    const formValue = this.form.getRawValue();

    const nombre = formValue.nombre
    const appat = formValue.appat
    const email = formValue.email


    const user = this.recuperarContrasenaService.recuperarContrasena(nombre, appat, email );

    if (!user) {
      alert('Usuario no encontrado');
      this.cerrar();
      return;
    }

    alert(user.contrasena);
    this.cerrar();
  }

  cerrar(){
    FormUtils.reset(this.form)
    this.cerrarModal.emit();
  }
}

