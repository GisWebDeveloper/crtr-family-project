import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonReportDynamicGardenComponent } from './gov-agency-mon-report-dynamic-garden.component';

describe('GovAgencyMonReportDynamicComponent', () => {
  let component: GovAgencyMonReportDynamicGardenComponent;
  let fixture: ComponentFixture<GovAgencyMonReportDynamicGardenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonReportDynamicGardenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonReportDynamicGardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
