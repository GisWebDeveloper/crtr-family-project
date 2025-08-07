import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPsListModalComponent } from './report-ps-list-modal.component';

describe('ReportPsListModalComponent', () => {
  let component: ReportPsListModalComponent;
  let fixture: ComponentFixture<ReportPsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPsListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
