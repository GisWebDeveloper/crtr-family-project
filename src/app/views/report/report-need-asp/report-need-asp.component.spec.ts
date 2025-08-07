import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNeedAspComponent } from './report-need-asp.component';

describe('ReportNeedAspComponent', () => {
  let component: ReportNeedAspComponent;
  let fixture: ComponentFixture<ReportNeedAspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNeedAspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNeedAspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
