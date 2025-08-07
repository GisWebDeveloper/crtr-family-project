import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMiorComponent } from './form-mior.component';

describe('FormMiorComponent', () => {
  let component: FormMiorComponent;
  let fixture: ComponentFixture<FormMiorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMiorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMiorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
