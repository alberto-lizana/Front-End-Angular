import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { normalizarUsuario } from '../utils/normalizadores';
import { AuthService } from './auth.service';

/**
 * @description
 * Servicio encargado de la gestión de actualización de usuarios en el sistema.
 *
 * Centraliza la modificación del estado del usuario, asegurando la
 * sincronización entre los datos persistidos y la sesión activa.
 */
@Injectable({ providedIn: 'root' })
export class ModificarUsuarioService{

    constructor(
        private authService: AuthService
    ){}


    /**
     * @description
     * Actualiza los datos de un usuario combinando la información existente
     * con los valores enviados desde un formulario.
     *
     * Solo se actualizan los campos que contienen valores válidos (no nulos
     * ni vacíos). Luego se normaliza el objeto final y se sincroniza tanto
     * el LocalStorage como la sesión activa.
     *
     * @param formData Datos provenientes del formulario.
     * @param dataUsuario Usuario actual antes de la modificación.
     */
    modificarUsuario ( formData: Record<string, string | null>, dataUsuario: Usuario): void{

        const usuarioActualizado = { ...dataUsuario };

        Object.entries(formData).forEach(([key, value]) => {

            if ( value === null || value === undefined || value.toString().trim() === '') {
                return;
            }

            (usuarioActualizado as any)[key] = value;

        });

        const usuarioModificado = normalizarUsuario(usuarioActualizado);

        this.authService.actualizarUsuarioLocalStorage(usuarioModificado);

        this.authService.actualizarSesion(usuarioModificado);

    }
}
