import { Component, computed, inject, signal } from '@angular/core';
import { Dashboard } from '../../components/dashboard/dashboard';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { getProductoMasVendido, getProductoMayorStock, getProductoMejorRatingPromedio, getProductoMenorStock, getProductoMenosVendido, getProductoPeorRatingPromedio} from '../../utils/ventas.utils';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { StorageService } from '../../services/storage.service';
import { DivisaService } from '../../services/divisa.service';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { ProductoService } from '../../services/producto.service';
import { getProductos } from '../../utils/productos.utils';
import { ProductosResponse } from '../../interfaces/productos.response.interface';
import { TablaProductos } from '../../components/tabla-productos/tabla-productos';
import { Producto } from '../../interfaces/producto.interface';
import { Modal } from '../../components/modal-form/modal-form';
import { FormCrearProducto } from '../../components/form-crear-producto/form-crear-producto';
import { FormModificarProducto } from '../../components/form-modificar-producto/form-modificar-producto';
import { ModificarProducto } from '../../interfaces/modificar.producto.interface';
import { ProductoRequest } from '../../interfaces/producto.request.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Dashboard, Nav, Footer, KpiCard, TablaUsuarios, TablaProductos, Modal, FormCrearProducto, FormModificarProducto],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private storageService = inject(StorageService);
  private divisaService = inject(DivisaService);
  private productoService = inject(ProductoService)

  dolar = this.divisaService.dolar;
  euro = this.divisaService.euro;
  real = this.divisaService.real;
  pesoArgentino = this.divisaService.pesoArgentino;
  pesoUruguayo = this.divisaService.pesoUruguayo;

  categoria = signal<keyof ProductosResponse | null>(null);
  mostrarProductos = signal(false);
  mostrarUsuarios = signal(false);

  isOpen = signal(false);
  modalType: string | null = null;

  // Producto seleccionado para ser modificado
  productoSeleccionado = signal<Producto | null>(null);

  usuarios = computed(() => { 
    const data = this.storageService.getUsuarios();
    if (!data) return [];
  
    return data;
  });


  productos = computed(() => {
    const productos = this.productoService.productos();
    if (!productos) return [];

    return getProductos(productos, this.categoria() ?? undefined);
  });


  masVendido = computed(() =>
    getProductoMasVendido(this.productos())
  );

  menosVendido = computed(() =>
    getProductoMenosVendido(this.productos())
  );

  stockBajo = computed(() =>
    getProductoMenorStock(this.productos())
  );

  stockAlto = computed(() =>
    getProductoMayorStock(this.productos())
  );

  mejorRating = computed(() =>
    getProductoMejorRatingPromedio(this.productos())
  );

  peorRating = computed(() =>
    getProductoPeorRatingPromedio(this.productos())
  );

  kpis = computed(() => [
    { titulo: 'Más vendido', valor: this.masVendido()?.nombre ?? '-' },
    { titulo: 'Menos vendido', valor: this.menosVendido()?.nombre ?? '-' },
    { titulo: 'Menor stock', valor: `${this.stockBajo()?.nombre ?? '-'} (${this.stockBajo()?.stock ?? 0})` },
    { titulo: 'Mayor stock', valor: `${this.stockAlto()?.nombre ?? '-'} (${this.stockAlto()?.stock ?? 0})` },
    { titulo: 'Mejor rating', valor: this.mejorRating()?.nombre ?? '-' },
    { titulo: 'Peor rating', valor: this.peorRating()?.nombre ?? '-' },
  ]);

  divisas = computed(() => 
    [
      {
        titulo: this.dolar()?.nombre ?? '-',
        valor: this.dolar()?.venta ?? 0,
      },

      {
        titulo: this.euro()?.nombre ?? '-',
        valor: this.euro()?.venta ?? 0,
      },

      {
        titulo: this.real()?.nombre ?? '-',
        valor: this.real()?.venta ?? 0,
      },

      {
        titulo: this.pesoArgentino()?.nombre ?? '-',
        valor: this.pesoArgentino()?.venta ?? 0,
      },

      {
        titulo: this.pesoUruguayo()?.nombre ?? '-',
        valor: this.pesoUruguayo()?.venta ?? 0,
      },
    ]
  );

  changeCategoria(cat: keyof ProductosResponse | null) {
    this.categoria.set(cat);
  } 

  cerrarCrearProducto() {
    this.isOpen.update(v => !v);
    this.modalType = null;
  }

  cerrarModificarProducto(){
    this.isOpen.update(v => !v);
    this.modalType = null;
    this.productoSeleccionado.set(null);
  }
    
  mostrarUsuariosEmit() {
    this.mostrarUsuarios.update(v => !v);
  }

  mostrarProductosEmit() {
    this.mostrarProductos.update(v => !v);
  }

  abrirModalCrearProducto() {
    this.modalType = 'Crear Producto';
    this.isOpen.update(v => !v);
  }

  abrirModalEditarProducto(producto: Producto) {
    this.productoSeleccionado.set(producto);

    console.log(this.productoSeleccionado());

    this.modalType = 'Modificar Producto';
    this.isOpen.set(true);
  }

  crearProducto(producto: Producto | ProductoRequest){
    if(!this.productoService.productoExiste(producto.nombre)){
      this.productoService.crearProductoPersistente(producto).subscribe({
        next: () => {
          alert("Producto Creado Con éxito")
        },
        error: err => console.error(err)
      });
    }
  }

  modificarProducto(productoNuevo: ModificarProducto){
    if (!this.productoSeleccionado()) return;

    const productoViejo = this.productoSeleccionado();

    this.productoService.modificarProducto(productoNuevo, productoViejo)
      .subscribe({
        next: () => {
          alert('Producto modificado');
        },
        error: err => console.error(err)
      });
  }

  eliminarProducto(producto: Producto) {
    this.productoService.borradoFisico(producto).subscribe({
      next: () => alert('Borrado Fisico ejecutado correctamente'),
      error: err => console.error(err)
    });
  }

  borradoLogicoProducto(producto: Producto) {
    this.productoService.borradoLogico(producto).subscribe({
      next: () => alert('Borrado Logico ejecutado correctamente'),
      error: err => console.error(err)
    });
  }

}
