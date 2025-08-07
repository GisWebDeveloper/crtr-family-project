import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMzReportDynamicOsmsComponent } from './gov-agency-mz-report-dynamic-osms.component';

describe('GovAgencyMsReportDynamicOsmsComponent', () => {
  let component: GovAgencyMzReportDynamicOsmsComponent;
  let fixture: ComponentFixture<GovAgencyMzReportDynamicOsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMzReportDynamicOsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMzReportDynamicOsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
