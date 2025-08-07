import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMfReportComponent } from './gov-agency-mf-report.component';

describe('GovAgencyMfReportComponent', () => {
  let component: GovAgencyMfReportComponent;
  let fixture: ComponentFixture<GovAgencyMfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
