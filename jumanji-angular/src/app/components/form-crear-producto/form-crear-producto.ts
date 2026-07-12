import { Component, output } from '@angular/core';
import { FormUtils } from '../../utils/form-utils';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validarDificultad, validarStock } from '../../utils/reutilizables';
import { normalizarProducto } from '../../utils/normalizadores';
import { ProductoRequest } from '../../interfaces/producto.request.interface';
import { maxLength } from '@angular/forms/signals';

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
    imagen: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    descripcion: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    categoria: new FormControl('', [Validators.required]),
    precio: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    descuento: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(1)]),
    cantidadJugadores: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    duracion: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    stock: new FormControl<number | null>(null, [Validators.required, (control) => validarStock(control.value)? null : { esCorrectoElStock: true },]),
    dificultad: new FormControl<number | null>(null, [Validators.required, (control) => validarDificultad(control.value) ? null : { esCorrectaLaDificultad: true },]),
  });

  errorMessages = {
    nombre:{
      requiredValidacion: '· El nombre es obligatorio',
      maxLengthValidacion: '· El nombre del producto no puede tener más de 100 caracteres.'
    },
    
    imagen:{
      requiredValidacion: '· La imagen es obligatoria.',
      maxLengthValidacion: '· La imagen del producto no puede tener más de 100 caracteres.'
    },

    descripcion:{
      requiredValidacion: '· La descripción es obligatorio.',
      maxLengthValidacion: '· La descripcion del producto no puede tener más de 255 caracteres.'
    },

    categoria:{
      requiredValidacion: '· La categoria es obligatoria.'
    },

    precio:{
      requiredValidacion: '· El precio es obligatorio.',
      minValidacion: '· El precio mínimo es 1.'
    },

    descuento:{
      requiredValidacion: '· El descuento es obligatorio.',
      minValidacion: '· El descuento mínimo es 0.',
      maxValidacion: '· El descuento máximo es 1.'
    },

    cantidadJugadores:{
      requiredValidacion: '· La cantidad de jugadores es obligatoria.',
      maxLengthValidacion: '· La cantidad máxima de caracteres es 50.'
    },

    duracion:{
      requiredValidacion: '· El descuento es obligatorio.',
      maxLengthValidacion: '· La cantidad máxima de caracteres es 50.'
    },

    stock: {
      requiredValidacion: '· El nombre es obligatorio',
      stockInvalido: '· El stock señalado no es mayor a 0'
    },

    dificultad: {
      requiredValidacion: '· El nombre es obligatorio',
      dificultadInvalida: '· El stock señalado no es mayor a 0'
    }
  };

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
