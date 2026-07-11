import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearProducto } from './form-crear-producto';

describe('FormCrearProducto', () => {
  let component: FormCrearProducto;
  let fixture: ComponentFixture<FormCrearProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrearProducto],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCrearProducto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
