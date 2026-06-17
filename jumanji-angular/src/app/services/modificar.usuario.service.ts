import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { normalizarUsuario } from '../utils/normalizadores';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ModificarUsuarioService{

    constructor(
        private authService: AuthService
    ){}

    Modificar ( formData: Record<string, string | null>, dataUsuario: Usuario): void{

    const usuarioActualizado = { ...dataUsuario };

    Object.entries(formData).forEach(([key, value]) => {

        if (
        value === null ||
        value === undefined ||
        value.toString().trim() === ''
        ) {
        return;
        }

        (usuarioActualizado as any)[key] = value;

    });

    const usuarioModificado = normalizarUsuario(usuarioActualizado);

    console.log(usuarioModificado);

    this.authService.actualizarUsuarioLocalStorage(usuarioModificado);

    this.authService.actualizarSesion(usuarioModificado);

    }
}
