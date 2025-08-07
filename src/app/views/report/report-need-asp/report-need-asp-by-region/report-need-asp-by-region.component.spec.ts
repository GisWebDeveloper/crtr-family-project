import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNeedAspByRegionComponent } from './report-need-asp-by-region.component';

describe('ReportNeedAspByRegionComponent', () => {
  let component: ReportNeedAspByRegionComponent;
  let fixture: ComponentFixture<ReportNeedAspByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNeedAspByRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNeedAspByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
