import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMiorReportNeetComponent } from './gov-agency-mior-report-neet.component';

describe('GovAgencyMiorReportNeetComponent', () => {
  let component: GovAgencyMiorReportNeetComponent;
  let fixture: ComponentFixture<GovAgencyMiorReportNeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMiorReportNeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMiorReportNeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
