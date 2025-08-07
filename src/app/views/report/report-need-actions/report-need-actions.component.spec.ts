import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNeedActionsComponent } from './report-need-actions.component';

describe('ReportNeedActionsComponent', () => {
  let component: ReportNeedActionsComponent;
  let fixture: ComponentFixture<ReportNeedActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNeedActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNeedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
