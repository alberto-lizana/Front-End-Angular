import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCategorias } from './img-categorias';

describe.skip('ImgCategorias', () => {
  let component: ImgCategorias;
  let fixture: ComponentFixture<ImgCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgCategorias],
    }).compileComponents();

    fixture = TestBed.createComponent(ImgCategorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
