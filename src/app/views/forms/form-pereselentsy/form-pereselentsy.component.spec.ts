import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPereselentsyComponent } from './form-pereselentsy.component';

describe('FormPereselentsyComponent', () => {
  let component: FormPereselentsyComponent;
  let fixture: ComponentFixture<FormPereselentsyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPereselentsyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPereselentsyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
