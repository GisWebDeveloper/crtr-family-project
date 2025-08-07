import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAspApplicantComponent } from './form-asp-applicant.component';

describe('FormAspApplicantComponent', () => {
  let component: FormAspApplicantComponent;
  let fixture: ComponentFixture<FormAspApplicantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAspApplicantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAspApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
