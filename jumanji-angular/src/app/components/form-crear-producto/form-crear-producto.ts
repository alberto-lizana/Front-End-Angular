import { Component, output } from '@angular/core';
import { FormUtils } from '../../utils/form-utils';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validarDificultad, validarStock } from '../../utils/reutilizables';
import { normalizarProducto } from '../../utils/normalizadores';
import { ProductoRequest } from '../../interfaces/producto.request.interface';

@Component({
  selector: 'app-form-crear-producto',
  imports: [ReactiveFormsModule],
  templateUrl: './form-crear-producto.html',
  styleUrl: './form-crear-producto.css',
})
export class FormCrearProducto {

  isOpen = output<void>();
  submitEmit = output<ProductoRequest>();

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    imagen: new FormControl('', [Validators.maxLength(100)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    descuento: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(1)]),
    cantidadJugadores: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    duracion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    stock: new FormControl<number | null>(null, [Validators.required, (control) => validarStock(control.value)? null : { esCorrectoElStock: true },]),
    dificultad: new FormControl<number | null>(null, [Validators.required, (control) => validarDificultad(control.value) ? null : { esCorrectaLaDificultad: true },]),
  });


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto = normalizarProducto(this.form.getRawValue() as ProductoRequest)
    this.submitEmit.emit(producto);
    this.cerrar();
  }

  cerrar() {
    FormUtils.reset(this.form);
    this.isOpen.emit();
  }

}
