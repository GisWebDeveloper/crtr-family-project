import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMonComponent } from './form-mon.component';

describe('FormMonComponent', () => {
  let component: FormMonComponent;
  let fixture: ComponentFixture<FormMonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
