import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMvdPrReportComponent } from './gov-agency-mvd-pr-report.component';

describe('GovAgencyMvdPrReportComponent', () => {
  let component: GovAgencyMvdPrReportComponent;
  let fixture: ComponentFixture<GovAgencyMvdPrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMvdPrReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMvdPrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
