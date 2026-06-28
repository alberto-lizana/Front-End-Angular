import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Admin } from "../interfaces/admin.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { normalizarUsuario } from "../utils/normalizadores";

/**
 * @description
 * Servicio encargado de gestionar la autenticación y el estado de la sesión del usuario.
 *
 * Responsabilidades:
 * - Iniciar sesión.
 * - Obtener la sesión activa.
 * - Actualizar los datos del usuario almacenados.
 * - Actualizar la información de la sesión.
 * - Cerrar sesión.
 */
 
@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private storageService: StorageService) {}

  /**
   * @description
   * Inicia sesión verificando las credenciales del usuario.
   *
   * Si las credenciales son válidas, crea la sesión en el SessionStorage
   * y retorna el usuario autenticado.
   *
   * @param email Correo electrónico del usuario.
   * @param contrasena Contraseña del usuario.
   * @returns El usuario autenticado o `null` si las credenciales son incorrectas.
   */
  login(email: string, contrasena: string): Admin | Usuario | null {
    
    const usuarios = this.storageService.getUsuarios();
    const administradores = this.storageService.getAdmin();

    const user =
      usuarios.find(u => u.email === email && u.contrasena === contrasena) ||
      administradores.find(a => a.email === email && a.contrasena === contrasena);

    if (!user) return null;

    if (user.rol === 'user'){
      const usuario = normalizarUsuario(user);
    
      this.storageService.setSessionItem('sesion', JSON.stringify({
        logueado: true,
        user: usuario
      }));

      return usuario;
    } else {
      this.storageService.setSessionItem('sesion', JSON.stringify({
        logueado: true,
        user: user
      }));
      return user;
    }
  }

  /**
   * @description
   * Obtenemos la session que está activa en el navegador.
   *
   * La session tiene dos parámetros logueado (boolean) y el objeto usuario, que es un conjunto de campos que le pertenecen al usuario
   * 
   * @returns Obtenemos la información del usuario (objeto usuario) de la cuenta que esta en el sessionStorage. Por otro lado si no existe session obtendremos undefined. 
   */
  getSessionActiva(){
    const sesion = this.storageService.getSessionItem('sesion');

    if (!sesion) return;

    const info = JSON.parse(sesion);
    const data = info.user

    return data
  }
  
  /**
   * @description
   * Actualiza la información de un usuario en el LocalStorage.
   *
   * Este método reemplaza los datos del usuario existente manteniendo su
   * identidad (`id`) y cualquier información previamente asociada, como el
   * carrito de compras u otros datos persistentes.
   *
   * @param usuario Usuario con la información actualizada.
   */
  actualizarUsuarioLocalStorage(usuario: Usuario){
    const usuarios = this.storageService.getUsuarios();

    const index = usuarios.findIndex(
      u => u.id === usuario.id
    );

    if (index !== -1) {
      usuarios[index] = usuario;
    }

    this.storageService.setItem(
      'usuarios',
      JSON.stringify(usuarios)
    )
  }

  /**
   * @description
   * Actualiza la información del usuario almacenada en la sesión activa.
   *
   * Si existe una sesión en el SessionStorage, reemplaza el objeto `user`
   * por la información recibida, manteniendo el resto de los datos de la
   * sesión, como el estado de autenticación (`logueado`).
   *
   * @param usuario Usuario con la información actualizada.
   *
   * @usageNotes
   * Este método se utiliza junto con `actualizarUsuarioLocalStorage()`
   * después de modificar los datos de un usuario, para mantener sincronizada
   * la información almacenada en el SessionStorage con la del LocalStorage.
   */
  actualizarSesion(usuario: Usuario){
    const sesion = this.storageService.getSessionItem('sesion');

    if (sesion) {
      const info = JSON.parse(sesion);
      info.user = usuario;

      this.storageService.setSessionItem(
        'sesion',
        JSON.stringify(info)
      )
    }
  }

  /**
   * @description
   * Cierra la sesión del usuario eliminando toda la información almacenada
   * en el SessionStorage.
   *
   * Una vez ejecutado este método, el usuario deja de estar autenticado.
   */
  logout() {
    this.storageService.clearSessionStorage();
  }
}