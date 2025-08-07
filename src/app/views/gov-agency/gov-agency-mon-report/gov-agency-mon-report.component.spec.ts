import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportComponent } from './gov-agency-mon-report.component';

describe('GovAgencyMonReportComponent', () => {
  let component: GovAgencyMonReportComponent;
  let fixture: ComponentFixture<GovAgencyMonReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
