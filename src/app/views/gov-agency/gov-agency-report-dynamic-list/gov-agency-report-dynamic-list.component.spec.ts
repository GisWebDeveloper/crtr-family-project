import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyReportDynamicListComponent } from './gov-agency-report-dynamic-list.component';

describe('GovAgencyReportDynamicListComponent', () => {
  let component: GovAgencyReportDynamicListComponent;
  let fixture: ComponentFixture<GovAgencyReportDynamicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyReportDynamicListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyReportDynamicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
