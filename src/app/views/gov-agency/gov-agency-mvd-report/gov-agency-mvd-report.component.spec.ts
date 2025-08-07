import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMvdReportComponent } from './gov-agency-mvd-report.component';

describe('GovAgencyMvdReportComponent', () => {
  let component: GovAgencyMvdReportComponent;
  let fixture: ComponentFixture<GovAgencyMvdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMvdReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMvdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
