import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMzComponent } from './form-mz.component';

describe('FormMzComponent', () => {
  let component: FormMzComponent;
  let fixture: ComponentFixture<FormMzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
