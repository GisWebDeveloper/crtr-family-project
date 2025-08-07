import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNeedAspConsolidatedComponent } from './report-need-asp-consolidated.component';

describe('ReportNeedAspConsolidatedComponent', () => {
  let component: ReportNeedAspConsolidatedComponent;
  let fixture: ComponentFixture<ReportNeedAspConsolidatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNeedAspConsolidatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNeedAspConsolidatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
