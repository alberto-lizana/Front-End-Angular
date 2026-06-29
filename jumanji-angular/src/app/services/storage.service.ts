// ============================================================
// StorageService
// ------------------------------------------------------------
// Este servicio resuelve un problema típico de Angular con SSR
// (Server-Side Rendering): las APIs `localStorage` y
// `sessionStorage` SOLO existen en el navegador. Si el código
// se ejecuta en el servidor (Node.js durante el renderizado SSR),
// estas APIs no existen y el programa lanza un error:
//   "ReferenceError: localStorage is not defined"
//
// La solución: antes de usarlas, preguntamos en qué entorno
// estamos corriendo. Si NO es el navegador, simplemente no
// hacemos nada (o devolvemos null), evitando el error.
// ============================================================

// Importamos las herramientas necesarias desde Angular:
// - Injectable: decorador que marca esta clase como un "servicio"
//   que Angular puede crear y entregar (inyectar) a quien lo pida.
// - Inject: función que usamos para pedirle a Angular un valor
//   especial (en este caso, PLATFORM_ID).
// - PLATFORM_ID: un "token" interno de Angular que indica en qué
//   plataforma se está ejecutando la app: 'browser' o 'server'.
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

// isPlatformBrowser: función helper que recibe el valor de
// PLATFORM_ID y devuelve true/false según si es el navegador.
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../interfaces/usuario.interface';
import { Producto } from '../interfaces/producto.interface';
import { Admin } from '../interfaces/admin.interface';


// @Injectable({ providedIn: 'root' })
// ------------------------------------------------------------
// Le dice a Angular: "esta clase es un servicio, créala UNA sola
// vez (singleton) y mantenla disponible para toda la aplicación".
// Es el equivalente conceptual a un @Service de Spring Boot,
// registrado como bean en el contenedor de inyección de
// dependencias.

/**
 * @description
 * Servicio encargado de abstraer el acceso a LocalStorage y SessionStorage.
 *
 * Su principal objetivo es centralizar el uso de estas APIs del navegador
 * y garantizar compatibilidad con SSR (Server Side Rendering), evitando
 * errores cuando la aplicación se ejecuta en entorno Node.js.
 *
 * Este servicio actúa como una capa de seguridad entre la aplicación y
 * el almacenamiento del navegador.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {

  // Variable privada que guarda el resultado de la pregunta:
  // "¿esta instancia de la app está corriendo en el navegador?"
  // Se calcula UNA sola vez (en el constructor) y se reutiliza
  // en todos los métodos de la clase.
  private isBrowser: boolean;

  // ----------------------------------------------------------
  // Constructor
  // ----------------------------------------------------------
  // Cuando Angular crea este servicio (la primera vez que algún
  // componente lo pide), automáticamente le "inyecta" el valor
  // de PLATFORM_ID gracias a @Inject(PLATFORM_ID).
  //
  // platformId valdrá:
  //   - 'browser' si la app corre en el navegador del usuario
  //   - 'server'  si la app corre en el servidor (Node, SSR)
  //
  // isPlatformBrowser(platformId) traduce ese valor a un booleano
  // simple: true (navegador) o false (servidor).
  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ----------------------------------------------------------
  // getItem
  // ----------------------------------------------------------
  // Wrapper (envoltorio) seguro de localStorage.getItem().
  //
  // - Si NO estamos en el navegador, devolvemos null de inmediato
  //   sin tocar localStorage (evita el error en el servidor).
  // - Si SÍ estamos en el navegador, llamamos a la función real
  //   de localStorage y devolvemos su resultado.
  
  /**
   * @description
   * Obtiene un valor almacenado en el localStorage según su clave.
   *
   * @param key Clave del valor almacenado.
   * @returns El valor asociado a la clave en formato string o `null` si no existe.
   */
  getItem(key: string): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(key);
  }

  // ----------------------------------------------------------
  // setItem
  // ----------------------------------------------------------
  // Wrapper seguro de localStorage.setItem().
  //
  // - Si NO estamos en el navegador, no hacemos nada (return
  //   vacío, porque el método es "void" = no devuelve nada).
  // - Si SÍ estamos en el navegador, guardamos el valor.

  /**
   * @description
   * Almacena un valor en el localStorage utilizando una clave.
   *
   * @param key Clave bajo la cual se almacenará el valor.
   * @param value Valor que se desea guardar en el localStorage.
   */
  setItem(key: string, value: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(key, value);
  }

  /**
   * @description
   * Elimina todos los datos almacenados en el localStorage.
   *
   * Este método borra completamente el contenido del almacenamiento local
   * del navegador.
   */
  clearLocalStorage(): void {
    if (!this.isBrowser) return;
    localStorage.clear();
  }

  // ----------------------------------------------------------
  // getSessionItem / setSessionItem
  // ----------------------------------------------------------
  // Misma lógica que getItem/setItem, pero usando sessionStorage
  // en vez de localStorage.
  //
  // Diferencia entre ambos:
  // - localStorage   -> los datos persisten aunque el usuario
  //                      cierre el navegador.
  // - sessionStorage -> los datos se borran al cerrar la pestaña
  //                      o el navegador.
  
  /**
   * @description
   * Obtiene un valor desde el SessionStorage según la clave proporcionada.
   *
   * @param key Clave del valor almacenado.
   * @returns El valor almacenado como string o `null` si no existe.
   */
  getSessionItem(key: string): string | null {
    if (!this.isBrowser) return null;
    return sessionStorage.getItem(key);
  }

  /**
   * @description
   * Almacena un valor en el SessionStorage utilizando una clave.
   *
   * @param key Clave bajo la cual se almacenará el valor.
   * @param value Valor que se desea guardar en el SessionStorage.
   */
  setSessionItem(key: string, value: string): void {
    if (!this.isBrowser) return;
    sessionStorage.setItem(key, value);
  }

  /**
   * @description
   * Elimina todos los datos almacenados en el SessionStorage del navegador.
   *
   * Este método borra completamente el contenido del almacenamiento de sesión.
   */
  clearSessionStorage(): void {
    if (!this.isBrowser) return;
    sessionStorage.clear();
  }

  // ----------------------------------------------------------
  // isRunningInBrowser
  // ----------------------------------------------------------
  // Método público para que, desde un componente, también puedas
  // preguntar "¿estoy en el navegador?" antes de usar OTRAS APIs
  // exclusivas del navegador, como `document` o `window`,
  // que este servicio no envuelve directamente.
  //
  // Ejemplo de uso en un componente:
  //   if (this.storage.isRunningInBrowser()) {
  //     document.body.classList.add('dark');
  //   }
  isRunningInBrowser(): boolean {
    return this.isBrowser;
  }

  /**
   * @description
   * Obtiene la lista de usuarios almacenados en el LocalStorage.
   *
   * Si no existe información o no se está ejecutando en el navegador,
   * retorna un arreglo vacío.
   *
   * @returns Lista de usuarios registrados.
   */
  getUsuarios(): Usuario[] {
    if (!this.isBrowser) return [];
    return JSON.parse(
      localStorage.getItem('usuarios') || '[]'
    );
  }

  /**
   * @description
   * Obtiene la lista de productos almacenados en el LocalStorage.
   *
   * Si no existe información o no se está ejecutando en el navegador,
   * retorna un arreglo vacío.
   *
   * @returns Lista de productos disponibles.
   */
  getProductos(): Producto[] {
    if (!this.isBrowser) return [];
    return JSON.parse(
      localStorage.getItem('productos') || '[]'
    );
  }

  /**
   * @description
   * Obtiene la lista de administradores almacenados en el LocalStorage.
   *
   * Si no existe información o no se está ejecutando en el navegador,
   * retorna un arreglo vacío.
   *
   * @returns Lista de administradores registrados.
   */
  getAdmin(): Admin[] {
    if (!this.isBrowser) return [];
    return JSON.parse(
      localStorage.getItem('admin') || '[]'
    );
  }

  /**
   * @description
   * Elimina un elemento específico del SessionStorage.
   *
   * Si la aplicación no se está ejecutando en un navegador,
   * el método no realiza ninguna acción.
   *
   * @param key Clave del elemento que se eliminará del SessionStorage.
   */
  removeSessionItem(key: string): void {
    if (!this.isBrowser) return;
    sessionStorage.removeItem(key);
  }
}


