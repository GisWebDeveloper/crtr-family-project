import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDCategoryComponent } from './form-d-category.component';

describe('FormDCategoryComponent', () => {
  let component: FormDCategoryComponent;
  let fixture: ComponentFixture<FormDCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
