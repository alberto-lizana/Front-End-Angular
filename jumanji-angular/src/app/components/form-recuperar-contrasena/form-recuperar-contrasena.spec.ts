import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRecuperarContrasena } from './form-recuperar-contrasena';

describe.skip('FormRecuperarUsuario', () => {
  let component: FormRecuperarContrasena;
  let fixture: ComponentFixture<FormRecuperarContrasena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRecuperarContrasena],
    }).compileComponents();

    fixture = TestBed.createComponent(FormRecuperarContrasena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
