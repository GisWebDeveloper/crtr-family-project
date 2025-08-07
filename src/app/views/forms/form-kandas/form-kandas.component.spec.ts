import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormKandasComponent } from './form-kandas.component';

describe('FormKandasComponent', () => {
  let component: FormKandasComponent;
  let fixture: ComponentFixture<FormKandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormKandasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormKandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
