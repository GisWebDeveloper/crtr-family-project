import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportSearchComponent } from './gov-agency-mon-report-search.component';

describe('GovAgencyMonReportSearchComponent', () => {
  let component: GovAgencyMonReportSearchComponent;
  let fixture: ComponentFixture<GovAgencyMonReportSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
