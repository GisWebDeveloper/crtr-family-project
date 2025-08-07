import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNeedActionsComponent } from './form-need-actions.component';

describe('FormNeedActionsComponent', () => {
  let component: FormNeedActionsComponent;
  let fixture: ComponentFixture<FormNeedActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormNeedActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNeedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
