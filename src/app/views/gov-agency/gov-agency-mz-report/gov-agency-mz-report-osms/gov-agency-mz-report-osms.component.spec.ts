import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMzReportOsmsComponent } from './gov-agency-mz-report-osms.component';

describe('GovAgencyMzReportOsmsComponent', () => {
  let component: GovAgencyMzReportOsmsComponent;
  let fixture: ComponentFixture<GovAgencyMzReportOsmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMzReportOsmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMzReportOsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
