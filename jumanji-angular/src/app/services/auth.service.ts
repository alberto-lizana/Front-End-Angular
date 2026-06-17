import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Admin } from "../interfaces/admin.interface";
import { Usuario } from "../interfaces/usuario.interface";
import { normalizarUsuario } from "../utils/normalizadores";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private storageService: StorageService) {}

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

  getSessionActiva(){
    const sesion = this.storageService.getSessionItem('sesion');

    if (!sesion) return;

    const info = JSON.parse(sesion);
    const data = info.user

    return data
  }
  
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

  logout() {
    this.storageService.clearSessionStorage();
  }
}