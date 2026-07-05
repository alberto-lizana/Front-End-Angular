import { Component, computed, inject, signal } from '@angular/core';
import { Dashboard } from '../../components/dashboard/dashboard';
import { Nav } from '../../components/nav/nav';
import { Footer } from '../../components/footer/footer';
import { getProductoMasVendido, getProductoMayorStock, getProductoMejorRatingPromedio, getProductoMenorStock, getProductoMenosVendido, getProductoPeorRatingPromedio, getProductosVentas } from '../../utils/ventas.utils';
import { VentasService } from '../../services/ventas.service';
import { KpiCard } from '../../components/kpi-card/kpi-card';
import { StorageService } from '../../services/storage.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { DivisaService } from '../../services/divisa.service';
import { TablaUsuarios } from '../../components/tabla-usuarios/tabla-usuarios';
import { ProductoSignalService } from '../../services/producto-signal.service';
import { getProductos } from '../../utils/productos.utils';
import { ProductosResponse } from '../../interfaces/productos.response.interface';
import { TablaProductos } from '../../components/tabla-productos/tabla-productos';
import { Producto } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [Dashboard, Nav, Footer, KpiCard, TablaUsuarios, TablaProductos],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private ventasService = inject(VentasService);
  private storageService = inject(StorageService);
  private divisaService = inject(DivisaService);
  private productoSignalService = inject(ProductoSignalService)

  dolar = this.divisaService.dolar;
  euro = this.divisaService.euro;
  real = this.divisaService.real;
  pesoArgentino = this.divisaService.pesoArgentino;
  pesoUruguayo = this.divisaService.pesoUruguayo;

  ventas = this.ventasService.ventas;

  categoria = signal<keyof ProductosResponse | null>(null);
  mostrarProductos = signal(false);
  mostrarUsuarios = signal(false);

  usuarios = computed(() => { 
    const data = this.storageService.getUsuarios();
    if (!data) return [];
  
    return data;
  });

  productos = computed(() => {
    const data = this.productoSignalService.productos();
    if (!data) return [];
  
    return getProductos(data, this.categoria() ?? undefined);
  });

  productosVentas= computed(() =>
    getProductosVentas(this.ventas(), this.categoria() ?? undefined)
  );

  masVendido = computed(() =>
    getProductoMasVendido(this.productosVentas())
  );

  menosVendido = computed(() =>
    getProductoMenosVendido(this.productosVentas())
  );

  stockBajo = computed(() =>
    getProductoMenorStock(this.productosVentas())
  );

  stockAlto = computed(() =>
    getProductoMayorStock(this.productosVentas())
  );

  mejorRating = computed(() =>
    getProductoMejorRatingPromedio(this.productosVentas())
  );

  peorRating = computed(() =>
    getProductoPeorRatingPromedio(this.productosVentas())
  );

  kpis = computed(() => [
    { titulo: 'Más vendido', valor: this.masVendido()?.nombre ?? '-' },
    { titulo: 'Menos vendido', valor: this.menosVendido()?.nombre ?? '-' },
    { titulo: 'Menor stock', valor: `${this.stockBajo()?.nombre ?? '-'} (${this.stockBajo()?.estadisticas.stock ?? 0})` },
    { titulo: 'Mayor stock', valor: `${this.stockAlto()?.nombre ?? '-'} (${this.stockAlto()?.estadisticas.stock ?? 0})` },
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

  mostrarUsuariosEmit() {
    this.mostrarUsuarios.update(v => !v);
  }

  mostrarProductosEmit() {
    this.mostrarProductos.update(v => !v);
  }

  editarProducto(producto: Producto) {
    console.log('Editar', producto);
  }

  eliminarProducto(producto: Producto) {
    console.log('Eliminar', producto);
  }

  verProducto(producto: Producto) {
    console.log('Ver', producto);
  }
}
