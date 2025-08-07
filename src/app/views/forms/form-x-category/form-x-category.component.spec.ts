import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormXCategoryComponent } from './form-x-category.component';

describe('FormXCategoryComponent', () => {
  let component: FormXCategoryComponent;
  let fixture: ComponentFixture<FormXCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormXCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormXCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
