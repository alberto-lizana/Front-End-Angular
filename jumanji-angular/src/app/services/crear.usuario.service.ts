import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Usuario } from "../interfaces/usuario.interface";
import { emailExiste } from "../utils/reutilizables";

/**
 * @description
 * Servicio encargado de gestionar la creación de usuarios en el sistema.
 *
 * Utiliza LocalStorage como fuente de persistencia en ausencia de backend.
 *
 */
@Injectable({ providedIn: 'root' })
export class CrearUsuarioService{

  constructor(
    private storageService: StorageService,
  ){}

  /**
   * @description
   * Registra un nuevo usuario en el sistema.
   *
   * Antes de agregarlo, valida que el email no exista en la lista actual
   * de usuarios. Si el correo ya está registrado, la operación es rechazada.
   *
   * @param usuario Usuario que se desea registrar.
   * @returns `true` si el usuario fue agregado correctamente,
   * `false` si el email ya existe.
   */
  crearUsuario(usuario: Usuario) : boolean{
    const usuarios = this.storageService.getUsuarios()

    if (emailExiste(usuario.email, usuarios)) {
      return false;
    }

    usuarios.push(usuario);
    this.storageService.setItem(
      'usuarios',
      JSON.stringify(usuarios)
    );
      return true;
  }
}