import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMiorReportDynamicNeetComponent } from './gov-agency-mior-report-dynamic-neet.component';

describe('GovAgencyMiorReportDynamicNeetComponent', () => {
  let component: GovAgencyMiorReportDynamicNeetComponent;
  let fixture: ComponentFixture<GovAgencyMiorReportDynamicNeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMiorReportDynamicNeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMiorReportDynamicNeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
