import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSusnComponent } from './form-susn.component';

describe('FormSusnComponent', () => {
  let component: FormSusnComponent;
  let fixture: ComponentFixture<FormSusnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSusnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSusnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
