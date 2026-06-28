import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSwitch } from './theme-switch';

describe.skip('ThemeSwitch', () => {
  let component: ThemeSwitch;
  let fixture: ComponentFixture<ThemeSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
