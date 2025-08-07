import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportDynamicSchoolComponent } from './gov-agency-mon-report-dynamic-school.component';

describe('GovAgencyMonReportSchoolDynamicComponent', () => {
  let component: GovAgencyMonReportDynamicSchoolComponent;
  let fixture: ComponentFixture<GovAgencyMonReportDynamicSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportDynamicSchoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportDynamicSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
