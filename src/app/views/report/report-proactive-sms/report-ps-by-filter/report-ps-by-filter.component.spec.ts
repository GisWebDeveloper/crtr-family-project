import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPsByFilterComponent } from './report-ps-by-filter.component';

describe('ReportPsByFilterComponent', () => {
  let component: ReportPsByFilterComponent;
  let fixture: ComponentFixture<ReportPsByFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPsByFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPsByFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
