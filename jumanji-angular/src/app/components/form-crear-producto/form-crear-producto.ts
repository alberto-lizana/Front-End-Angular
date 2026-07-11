import { Component, output } from '@angular/core';
import { FormUtils } from '../../utils/form-utils';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validarDificultad, validarStock } from '../../utils/reutilizables';
import { ProductoRequest } from '../../interfaces/producto.interface';
import { normalizarProducto } from '../../utils/normalizadores';

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
    nombre: new FormControl('', [Validators.required]),
    imagen: new FormControl<string | null>(null),
    descripcion: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl<number | null>(null, [Validators.required]),
    descuento: new FormControl<number | null>(null, [Validators.required]),
    cantidadJugadores: new FormControl('', [Validators.required]),
    duracion: new FormControl('', [Validators.required]),
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
    console.log(producto)
    this.cerrar();
  }

  cerrar() {
    FormUtils.reset(this.form);
    this.isOpen.emit();
  }

}
