import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMfComponent } from './form-mf.component';

describe('FormMfComponent', () => {
  let component: FormMfComponent;
  let fixture: ComponentFixture<FormMfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
