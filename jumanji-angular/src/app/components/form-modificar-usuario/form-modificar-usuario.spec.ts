import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModificarUsuario } from './form-modificar-usuario';

describe('FormModificarUsuario', () => {
  let component: FormModificarUsuario;
  let fixture: ComponentFixture<FormModificarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormModificarUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(FormModificarUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
