import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Usuario } from "../interfaces/usuario.interface";

/**
 * @description
 * Servicio encargado de gestionar la recuperación de usuarios mediante
 * la validación de información personal almacenada en el sistema.
 * 
 */
@Injectable({ providedIn: 'root' })
export class RecuperarContrasenaService {

  constructor(
    private storageService: StorageService,
  ) {}

  /**
   * @description
   * Busca un usuario cuyos datos coincidan con la información proporcionada.
   *
   * @param nombre Nombre del usuario.
   * @param appat Apellido paterno del usuario.
   * @param email Correo electrónico del usuario.
   * @returns El usuario encontrado o `null` si no existe una coincidencia.
   */
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