import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Acordeon } from './acordeon';

describe('Acordeon', () => {
  let component: Acordeon;
  let fixture: ComponentFixture<Acordeon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Acordeon],
    }).compileComponents();

    fixture = TestBed.createComponent(Acordeon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
