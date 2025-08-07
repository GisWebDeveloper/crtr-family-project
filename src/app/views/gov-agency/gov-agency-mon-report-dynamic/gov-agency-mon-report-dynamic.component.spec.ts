import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportDynamicComponent } from './gov-agency-mon-report-dynamic.component';

describe('GovAgencyMonReportDynamicComponent', () => {
  let component: GovAgencyMonReportDynamicComponent;
  let fixture: ComponentFixture<GovAgencyMonReportDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
