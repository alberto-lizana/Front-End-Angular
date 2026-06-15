import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
import { Usuario } from "../interfaces/usuario.interface";
import { emailExiste } from "../utils/reutilizables";

@Injectable({ providedIn: 'root' })
export class CrearUsuarioService{

    constructor(
        private storageService: StorageService,
    ){}

    crearUsuario(usuario: Usuario) : boolean{

        const usuarios = this.storageService.getUsuarios();

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