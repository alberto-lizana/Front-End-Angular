import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosResponse } from '../interfaces/usuarios.response';

/**
 * @description
 * Servicio encargado de proporcionar acceso a la información de los
 * usuarios almacenada en un archivo JSON local.
 * 
 */
@Injectable({ providedIn: 'root' })
export class UsuarioService{

  private http = inject(HttpClient);

  rutaUsuarios = 'assets/JSON/usuarios/usuarios.json';
  
  /**
   * @description
   * Obtiene la colección de usuarios desde el archivo JSON.
   *
   * @returns Observable con la información de los usuarios.
   */
  obtenerUsuariosJSON() {
    return this.http.get<UsuariosResponse>(this.rutaUsuarios);
  }

}