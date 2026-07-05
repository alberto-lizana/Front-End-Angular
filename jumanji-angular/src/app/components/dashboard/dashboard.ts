import { Component, input, output } from '@angular/core';
import { ProductosResponse } from '../../interfaces/productos.response.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  categoriaChange = output<keyof ProductosResponse | null>();
  mostrarUsuarios = output<void>();
  mostrarProductos = output<void>();
  mostrarUsuariosInput = input<boolean>();
  mostrarProductosInput = input<boolean>();



  changeCategoria(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.categoriaChange.emit(
      value ? (value as keyof ProductosResponse) : null
    );
  }

  mostrarUsuariosEmit() {
    this.mostrarUsuarios.emit();
  }  

  mostrarProductosEmit(){
    this.mostrarProductos.emit();
  }

}
