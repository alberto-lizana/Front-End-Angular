import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuariosResponse } from '../interfaces/usuarios.response';

@Injectable({ providedIn: 'root' })
export class UsuarioService{

  private http = inject(HttpClient);

  rutaUsuarios = 'assets/JSON/usuarios/usuarios.json';

  obtenerUsuariosJSON() {
    return this.http.get<UsuariosResponse>(this.rutaUsuarios);
  }

}