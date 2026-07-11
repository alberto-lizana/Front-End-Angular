import { Component, effect, input, OnChanges, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../utils/form-utils';
import { normalizarProductoParaModificar } from '../../utils/normalizadores';
import { ModificarProducto } from '../../interfaces/modificar.producto.interface';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-form-modificar-producto',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './form-modificar-producto.html',
  styleUrl: './form-modificar-producto.css',
})
export class FormModificarProducto {

  isOpen = output<void>();
  submitEmit = output<ModificarProducto>();
  producto = input<Producto | null>(null);
  
  constructor() {
    effect(() => {

      const producto = this.producto();

      console.log("INPUT:", producto);

      if (!producto) return;

      this.form.patchValue({
        nombre: producto.nombre,
        imagen: producto.imagen,
        descripcion: producto.descripcion,
        categoria: producto.categoria,
        precio: producto.precio,
        descuento: producto.descuento,
        cantidadJugadores: producto.cantidadJugadores,
        duracion: producto.duracion,
        stock: producto.stock,
        dificultad: producto.dificultad,
        unidadesVendidas: producto.estadisticasVentas?.unidadesVendidas,
        devoluciones: producto.estadisticasVentas?.devoluciones,
        ratingPromedio: producto.estadisticasVentas?.ratingPromedio,
      });

    });
  }

form = new FormGroup({
  nombre: new FormControl<string>('', [Validators.maxLength(100)]),
  imagen: new FormControl<string>('', [Validators.maxLength(100)]),
  descripcion: new FormControl<string>('', [Validators.maxLength(255)]),
  categoria: new FormControl<string | null>(null),
  precio: new FormControl<number | null>(null, [Validators.min(1)]),
  descuento: new FormControl<number | null>(null, [Validators.min(0), Validators.max(1)]),
  cantidadJugadores: new FormControl<string>('', [Validators.maxLength(50)]),
  duracion: new FormControl<string>('', [Validators.maxLength(50)]),
  stock: new FormControl<number | null>(null, [Validators.min(0)]),
  dificultad: new FormControl<number | null>(null, [Validators.min(1), Validators.max(5)]),
  unidadesVendidas: new FormControl<number | null>(null, [Validators.min(0)]),
  devoluciones: new FormControl<number | null>(null, [Validators.min(0)]),
  ratingPromedio: new FormControl<number | null>(null, [Validators.min(1), Validators.max(5)])
});

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const producto = normalizarProductoParaModificar(this.form.getRawValue() as unknown as ModificarProducto)
    console.log(producto)
    this.submitEmit.emit(producto);
    this.cerrar();
  }

  limpiar(){
    this.form.markAsPristine();
    this.form.markAsUntouched();
      this.form.patchValue({
        nombre: '',
        imagen: '',
        descripcion: '',
        precio: null,
        descuento: null,
        cantidadJugadores: '',
        duracion: '',
        stock: null,
        dificultad: null,
        unidadesVendidas: null,
        devoluciones: null,
        ratingPromedio: null
      });    
  }

  cerrar() {
    FormUtils.reset(this.form);
    this.isOpen.emit();
  }  
}
