import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKandasPersonComponent } from './form-kandas-person.component';

describe('FormKandasComponent', () => {
  let component: FormKandasPersonComponent;
  let fixture: ComponentFixture<FormKandasPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKandasPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKandasPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
