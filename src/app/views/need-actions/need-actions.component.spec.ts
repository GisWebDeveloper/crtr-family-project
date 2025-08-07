import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedActionsComponent } from './need-actions.component';

describe('NeedActionsComponent', () => {
  let component: NeedActionsComponent;
  let fixture: ComponentFixture<NeedActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
