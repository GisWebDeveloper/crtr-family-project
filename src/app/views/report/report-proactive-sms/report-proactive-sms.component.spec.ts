import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportProactiveSmsComponent } from './report-proactive-sms.component';

describe('ReportProactiveSmsComponent', () => {
  let component: ReportProactiveSmsComponent;
  let fixture: ComponentFixture<ReportProactiveSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportProactiveSmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportProactiveSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
