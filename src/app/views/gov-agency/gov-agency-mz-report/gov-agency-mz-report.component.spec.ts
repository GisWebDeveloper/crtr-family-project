import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMzReportComponent } from './gov-agency-mz-report.component';

describe('GovAgencyMzReportComponent', () => {
  let component: GovAgencyMzReportComponent;
  let fixture: ComponentFixture<GovAgencyMzReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMzReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMzReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
