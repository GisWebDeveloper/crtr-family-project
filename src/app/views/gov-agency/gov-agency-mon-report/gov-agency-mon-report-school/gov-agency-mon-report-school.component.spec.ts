import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportSchoolComponent } from './gov-agency-mon-report-school.component';

describe('GovAgencyMonReportSchoolComponent', () => {
  let component: GovAgencyMonReportSchoolComponent;
  let fixture: ComponentFixture<GovAgencyMonReportSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
