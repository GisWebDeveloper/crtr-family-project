import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormECategoryComponent } from './form-e-category.component';

describe('FormECategoryComponent', () => {
  let component: FormECategoryComponent;
  let fixture: ComponentFixture<FormECategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormECategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormECategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
