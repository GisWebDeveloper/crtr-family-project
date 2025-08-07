import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMiorReportComponent } from './gov-agency-mior-report.component';

describe('GovAgencyMiorReportComponent', () => {
  let component: GovAgencyMiorReportComponent;
  let fixture: ComponentFixture<GovAgencyMiorReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMiorReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMiorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
