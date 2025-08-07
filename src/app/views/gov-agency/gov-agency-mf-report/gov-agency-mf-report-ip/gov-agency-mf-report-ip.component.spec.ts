import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMfReportIpComponent } from './gov-agency-mf-report-ip.component';

describe('GovAgencyMfReportIpComponent', () => {
  let component: GovAgencyMfReportIpComponent;
  let fixture: ComponentFixture<GovAgencyMfReportIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMfReportIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMfReportIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
