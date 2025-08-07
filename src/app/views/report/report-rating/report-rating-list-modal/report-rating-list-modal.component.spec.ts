import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportRatingListModalComponent } from './report-rating-list-modal.component';

describe('ReportRatingListModalComponent', () => {
  let component: ReportRatingListModalComponent;
  let fixture: ComponentFixture<ReportRatingListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportRatingListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportRatingListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
