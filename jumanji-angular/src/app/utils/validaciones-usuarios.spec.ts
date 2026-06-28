import { describe, it, expect} from 'vitest';
import { FormControl, FormGroup } from '@angular/forms';
import { passwordMatchValidator } from './validaciones-usuario';
import { validarApellido, validarContrasena, validarEmail, validarNombre } from './validaciones-usuario';

describe('Pruebas Unitarias Validaciones Usuario', () => {

    describe('validarNombre', () => {

        const nombresInvalidos = [
            "12Juan",      // números
            "J",           // muy corto
            "@Pedro",      // símbolo raro
            "   "          // vacío real
        ];

        const nombresValidos = [
            "Pedro",
            "Luis Alberto",
            "Ana Maria",
            "Carlos"
        ];

        it.each(nombresInvalidos)('debería retornar false para nombres inválidos: %s', (nombre) => {
            expect(validarNombre(nombre)).toBe(false);
        });

        it.each(nombresValidos)('debería retornar true para nombres válidos: %s', (nombre) => {
            expect(validarNombre(nombre)).toBe(true);
        });

    });

    describe('validarApellido', () => {

        const apellidosValidos = [
            "O'connor",
            "De la cruz",
            "van-halen",
            "núñez",
            'Pérez'
        ];

        const apellidosNoValidos = [
            'a',
            '4l6er70',
            '$elea!',
            '  k"ritzw *$!"%&z  ',
            '      ',
            'k"ritzw *$!"%&z'
        ];

        it.each(apellidosValidos)('debería validar apellido válido: %s', (apellido) => {
            expect(validarApellido(apellido)).toBe(true);
        });

        it.each(apellidosNoValidos)('debería rechazar apellido inválido: %s', (apellido) => {
            expect(validarApellido(apellido)).toBe(false);
        });

    });

    describe('validarEmail', () => {

        const emailsValidos = [
            "juan.perez@gmail.com",
            "maria_lopez@outlook.com",
            "carlos123@hotmail.com",
            "ana-maria@empresa.cl"
        ];

        const emailsInvalidos = [
            "juan.perezgmail.com",      // sin @
            "maria@.com",               // dominio inválido
            "carlos@empresa",           // sin extensión
            "test@",                    // incompleto
            "@gmail.com"                // sin usuario
        ];

        it.each(emailsValidos)('Debería validar el email válido: %s', (email) => {
            expect(validarEmail(email)).toBe(true)
        });

        it.each(emailsInvalidos)('Debería rechazar el email inválido: %s', (email) => {
            expect(validarEmail(email)).toBe(false)
        });   
          
    });

    describe('validarContrasena', () => {

        const contrasenasValidas = [
            "Abcdef1!",
            "Password123$",
            "HolaMundo9#",
            "SeguraA1@"
        ];

        const contrasenasInvalidas = [
            "abcdefg!",     // sin mayúscula y < 8 caracteres
            "ABCDEFG1!",    // sin minúscula
            "Abcdefgh",     // sin carácter especial
            "Abc123",       // menos de 8 caracteres
            " Abcdef1!",    // espacio al inicio
            "Abcdef1! "     // espacio al final
        ];

        it.each(contrasenasValidas)('Debería validar la contraseña válida: %s', (contrasenia) => {
            expect(validarContrasena(contrasenia)).toBe(true)
        });

        it.each(contrasenasInvalidas)('Debería rechazar la contraseña inválida: %s', (contrasenia) => {
            expect(validarContrasena(contrasenia)).toBe(false)
        });
    });

    describe('passwordMatchValidator', () => {

        it('debería retornar null si las contraseñas son iguales', () => {
        const form = new FormGroup({
            contrasena: new FormControl('Abc123!'),
            r_contrasena: new FormControl('Abc123!')
        });

        const result = passwordMatchValidator(form);

        expect(result).toBeNull();
        });

        it('debería retornar error si las contraseñas son diferentes', () => {
        const form = new FormGroup({
            contrasena: new FormControl('Abc123!'),
            r_contrasena: new FormControl('Otro123!')
        });

        const result = passwordMatchValidator(form);

        expect(result).toEqual({ passwordMismatch: true });
        });
    });

});
