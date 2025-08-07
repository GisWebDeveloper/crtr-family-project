import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPsWithSmsListModalComponent } from './report-ps-with-sms-list-modal.component';

describe('ReportPsWithSmsListModalComponent', () => {
  let component: ReportPsWithSmsListModalComponent;
  let fixture: ComponentFixture<ReportPsWithSmsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPsWithSmsListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPsWithSmsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
