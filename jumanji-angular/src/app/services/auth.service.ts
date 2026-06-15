import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Admin } from "../interfaces/admin.interface";
import { Usuario } from "../interfaces/usuario.interface";

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

    this.storageService.setSessionItem('sesion', JSON.stringify({
      logueado: true,
      user: user
    }));

    return user;
  }

  logout() {
    this.storageService.clearSessionStorage();
  }
}