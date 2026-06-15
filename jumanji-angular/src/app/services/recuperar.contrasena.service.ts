import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Usuario } from "../interfaces/usuario.interface";

@Injectable({ providedIn: 'root' })
export class RecuperarContrasenaService {

  constructor(
    private storageService: StorageService,
  ) {}

  recuperarContrasena(nombre: string, appat: string, email: string) : Usuario | null {

    const usuarios = this.storageService.getUsuarios();

    const user = usuarios.find(
      item =>
        item.nombre === nombre &&
        item.appat === appat &&
        item.email === email
    ) ?? null;

    return user
  }
}