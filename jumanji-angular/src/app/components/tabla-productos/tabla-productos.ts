import { Component, input, output } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';
import { generarDificultad } from '../../utils/productos.utils';

@Component({
  selector: 'app-tabla-productos',
  imports: [],
  standalone: true,
  templateUrl: './tabla-productos.html',
  styleUrl: './tabla-productos.css',
})
export class TablaProductos {

  datosProductos = input.required<Producto[]>();
  abrirModalEditarProducto = output<Producto>();
  eliminarProducto = output<Producto>();
  borradoLogicoProducto = output<Producto>();

  generarDificultad = generarDificultad;

  editarProductoEmit(producto: Producto){
    this.abrirModalEditarProducto.emit(producto);
  }

  eliminarProductoEmit(producto: Producto){
    this.eliminarProducto.emit(producto);
  }

  borradoLogicoProductoEmit(producto: Producto){
    this.borradoLogicoProducto.emit(producto);
  }
}
