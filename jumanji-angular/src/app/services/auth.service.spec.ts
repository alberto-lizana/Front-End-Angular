import { Usuario } from "../interfaces/usuario.interface";
import { Admin } from "../pages/admin/admin";
import { AuthService } from "./auth.service";
import { describe, it, expect, vi, beforeEach} from 'vitest';

describe('AuthService', () => {

    const usuario: Usuario = {
        id: 1,
        nombre: "jose pablo",
        appat: "soto",
        apmat: "videla",
        email: "jose.pablo@gmail.cl",
        contrasena: "jose123.123.123J",
        r_contrasena: "jose123.123.123J",
        direccion: "av. república 4520, condominio santa maría, depto 15h, santiago, chile",
        rol: "user"
    };

    const usuarioDos: Usuario = {
        id: 2,
        nombre: "carmen gloria",
        appat: "vidal",
        apmat: "campos",
        email: "carmen.gloria@gmail.cl",
        contrasena: "carmen123C123C123C.",
        r_contrasena: "carmen123C123C123C.",
        direccion: "av. república 8500, condominio las palmas, depto 1a, santiago, chile",
        rol: "user"
    };

    const admin: Admin = {
        id: 3,
        nombre: "administrador",
        email: "admin@jumanjigames.cl",
        contrasena: "123456789987654321",
        rol: "admin"
    }        

    const storageMock = {
        getUsuarios: vi.fn(),
        getAdmin: vi.fn(),
        setSessionItem: vi.fn(),
        getSessionItem: vi.fn(),
        setItem: vi.fn(),
        removeSessionItem: vi.fn(),
    };

    let authService: AuthService;

    beforeEach(() => {
        vi.clearAllMocks();
        
        authService = new AuthService(storageMock as any);
        
        storageMock.getUsuarios.mockReturnValue([]);
        storageMock.getAdmin.mockReturnValue([]);

        storageMock.getSessionItem.mockReturnValue([]);
    });


    describe('login', () => {

        it('Debería retornar null si las credenciales son incorrectas', () => {

            const result = authService.login('a@test.com', '1234');

            expect(result).toBeNull();
            expect(storageMock.setSessionItem).not.toHaveBeenCalled();
        });

        it('Debería iniciar sesión de un usuario', () => {

            storageMock.getUsuarios.mockReturnValue([usuario]);

            const result = authService.login('jose.pablo@gmail.cl', 'jose123.123.123J');

            expect(result).toEqual(usuario);
            expect(storageMock.setSessionItem).toHaveBeenCalledOnce();
        });

        it('Debería iniciar sesión de un admin', () => {

            storageMock.getAdmin.mockReturnValue([admin]);

            const result = authService.login('admin@jumanjigames.cl', '123456789987654321');

            expect(result).toEqual(admin);
            expect(storageMock.setSessionItem).toHaveBeenCalledOnce();
        });
    });
    

    describe('getSessionActiva', () => {


        it('Deberia devolver a la informacion del usuario de la sesion activa', () => {

            storageMock.getSessionItem.mockReturnValue(
                JSON.stringify({
                    logueado: true,
                    user: usuario
                })
            );

            const response = authService.getSessionActiva();

            expect(response).toEqual(usuario);

        });

        it('Deberia devolver null al no encontrarse una session activa', () => {

            storageMock.getSessionItem.mockReturnValue(null);

            const response = authService.getSessionActiva();

            expect(response).toBeNull();

        });

    });

    describe('actualizarUsuarioLocalStorage', () => {
        
        it('Actualizaría al usuario con éxito', () => {

            storageMock.getUsuarios.mockReturnValue([usuario, usuarioDos]);

            const usuarioActualizado: Usuario = {
                id: 1,
                nombre: "martín",
                appat: "campos",
                apmat: "",
                email: "martin_campos@gmail.cl",
                contrasena: ".martinCampos123",
                r_contrasena: ".martinCampos123",
                direccion: "av. república 4520, condominio santa maría, depto 15h, santiago, chile",
                rol: "user"   
            }

            authService.actualizarUsuarioLocalStorage(usuarioActualizado);

            expect(storageMock.getUsuarios).toHaveBeenCalledOnce();
            expect(storageMock.setItem).toHaveBeenCalledOnce();
            expect(storageMock.setItem).toHaveBeenCalledWith('usuarios', 
                JSON.stringify([
                    usuarioActualizado,
                    usuarioDos
                ])
            );
        }); 

        it('No se actualizará al usuario porque no existe en el storage', () => {
            
            storageMock.getUsuarios.mockReturnValue([usuario, usuarioDos]);

            const usuarioActualizadoDos: Usuario = {
                id: Date.now(),
                nombre: "martín",
                appat: "campos",
                apmat: "",
                email: "martin_campos@gmail.cl",
                contrasena: ".martinCampos123",
                r_contrasena: ".martinCampos123",
                direccion: "av. república 4520, condominio santa maría, depto 15h, santiago, chile",
                rol: "user"   
            }           
            
            authService.actualizarUsuarioLocalStorage(usuarioActualizadoDos);

            expect(storageMock.getUsuarios).toHaveBeenCalledOnce();
            expect(storageMock.setItem).toHaveBeenCalledOnce();
            expect(storageMock.setItem).toHaveBeenCalledWith('usuarios', 
                JSON.stringify([
                    usuario,
                    usuarioDos
                ])
            );
        });
    });

    describe('actualizarSesion', () => {

        it('Actualizaría la sesión con éxito', () => {

            storageMock.getSessionItem.mockReturnValue(
                JSON.stringify({
                    logueado: true,
                    user: usuarioDos
                })
            );

            const usuarioActualizadoDos: Usuario = {
                id: 2,
                nombre: "martín",
                appat: "campos",
                apmat: "",
                email: "martin_campos@gmail.cl",
                contrasena: ".martinCampos123",
                r_contrasena: ".martinCampos123",
                direccion: "av. república 4520, condominio santa maría, depto 15h, santiago, chile",
                rol: "user"
            };

            authService.actualizarSesion(usuarioActualizadoDos);

            expect(storageMock.getSessionItem).toHaveBeenCalledOnce();

            expect(storageMock.setSessionItem).toHaveBeenCalledOnce();

            expect(storageMock.setSessionItem).toHaveBeenCalledWith(
                'sesion',
                JSON.stringify({
                    logueado: true,
                    user: usuarioActualizadoDos
                })
            );
        });

    });

    describe('logout', () => {

        it('Borra la sesión activa correctamente', () => {

            storageMock.getSessionItem.mockReturnValue(
                JSON.stringify({
                    logueado: true,
                    user: usuarioDos
                })
            );

            const response = authService.logout();

            expect(storageMock.getSessionItem).toHaveBeenCalledOnce();
            expect(storageMock.getSessionItem).toHaveBeenCalledWith('sesion');

            expect(storageMock.removeSessionItem).toHaveBeenCalledOnce();
            expect(storageMock.removeSessionItem).toHaveBeenCalledWith('sesion');

            expect(response).toBe(true);
        });
    });
    
});

