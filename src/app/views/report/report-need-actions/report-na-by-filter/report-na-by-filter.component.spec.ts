import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNaByFilterComponent } from './report-na-by-filter.component';

describe('ReportNaByFilterComponent', () => {
  let component: ReportNaByFilterComponent;
  let fixture: ComponentFixture<ReportNaByFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNaByFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNaByFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
