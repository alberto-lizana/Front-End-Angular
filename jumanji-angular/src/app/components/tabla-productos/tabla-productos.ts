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

  editarProducto = output<Producto>();

  eliminarProducto = output<Producto>();

  verProducto = output<Producto>();

  generarDificultad = generarDificultad;

  editarProductoEmit(producto: Producto){
    this.editarProducto.emit(producto);
  }
  eliminarProductoEmit(producto: Producto){
    this.eliminarProducto.emit(producto);
  }
  verProductoEmit(producto: Producto){
    this.verProducto.emit(producto);
  }
}
