import { Component, EventEmitter, inject, Input, OnInit } from '@angular/core';
import { LoginBox } from '../../components/login-box/login-box';
import { Modal } from '../../components/modal-form/modal-form';
import { FormCrearUsuario } from '../../components/form-crear-usuario/form-crear-usuario';
import { FormRecuperarContrasena } from '../../components/form-recuperar-contrasena/form-recuperar-contrasena';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage.service';
import { ProductoService } from '../../services/producto.service';

/**
 * @description
 * Componente encargado de orquestar la página de inicio de sesión.
 *
 * Coordina los componentes de autenticación, administra la apertura
 * de los formularios modales e inicializa la información de usuarios
 * y productos cuando aún no se encuentra almacenada localmente.
 */
@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [LoginBox, Modal, FormCrearUsuario, FormRecuperarContrasena],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion implements OnInit{

  @Input() isOpen = false;
  @Input() closed = new EventEmitter<void>();

  constructor(
    private storageService: StorageService,
  ){}

  private usuarioService = inject(UsuarioService);
  private productoService = inject(ProductoService);
  
  modalType: 'crear' | 'recuperar' | null = null;
  
  /**
   * @description
   * Inicializa la información necesaria para la aplicación.
   *
   * Si los usuarios o productos no se encuentran almacenados en el
   * LocalStorage, los obtiene desde los archivos JSON y los almacena
   * para su posterior utilización.
   */
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

  /**
   * @description
   * Abre el formulario modal para el registro de un nuevo usuario.
   */
  abrirCrear() {
    this.modalType = 'crear';
    this.isOpen = true;
  }

  /**
   * @description
   * Abre el formulario modal para la recuperación de contraseña.
   */
  abrirRecuperar() {
    this.modalType = 'recuperar';
    this.isOpen = true;
  }
}
