import { Component, EventEmitter, inject, Input } from '@angular/core';
import { LoginBox } from '../../components/login-box/login-box';
import { Modal } from '../../components/modal-form/modal-form';
import { FormCrearUsuario } from '../../components/form-crear-usuario/form-crear-usuario';
import { FormRecuperarContrasena } from '../../components/form-recuperar-contrasena/form-recuperar-contrasena';
import { UsuarioService } from '../../services/usuario.service.';
import { StorageService } from '../../services/storage.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [LoginBox, Modal, FormCrearUsuario, FormRecuperarContrasena],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {

  @Input() isOpen = false;
  @Input() closed = new EventEmitter<void>();

  constructor(
    private storageService: StorageService,
  ){}

  private usuarioService = inject(UsuarioService);
  private productoService = inject(ProductoService);
  
  modalType: 'crear' | 'recuperar' | null = null;
  

  ngOnInit() {
    //this.storageService.clearLocalStorage();
    //this.storageService.clearSessionStorage();

    if (this.storageService.getUsuarios().length > 0) return; 
      this.usuarioService
        .obtenerUsuariosJSON()
        .subscribe(data => {
          this.storageService.setItem('admin', JSON.stringify(data.admin))
          this.storageService.setItem('usuarios', JSON.stringify(data.usuarios))
        });

      
    if(this.storageService.getProductos().length > 0) return;
      this.productoService.obtenerProductosJSON().subscribe(data => {
        this.storageService.setItem('productos', JSON.stringify(data));
      });
  }

  abrirCrear() {
    this.modalType = 'crear';
    this.isOpen = true;
  }

  abrirRecuperar() {
    this.modalType = 'recuperar';
    this.isOpen = true;
  }
}
