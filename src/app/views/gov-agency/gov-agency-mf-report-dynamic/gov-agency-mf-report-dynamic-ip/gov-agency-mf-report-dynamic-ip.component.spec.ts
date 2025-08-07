import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMfReportDynamicIpComponent } from './gov-agency-mf-report-dynamic-ip.component';

describe('GovAgencyMfReportDynamicIpComponent', () => {
  let component: GovAgencyMfReportDynamicIpComponent;
  let fixture: ComponentFixture<GovAgencyMfReportDynamicIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMfReportDynamicIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMfReportDynamicIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
