import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportNaConsolidatedByCategoryComponent } from './report-na-consolidated-by-category.component';

describe('ReportNaConsolidatedByCategoryComponent', () => {
  let component: ReportNaConsolidatedByCategoryComponent;
  let fixture: ComponentFixture<ReportNaConsolidatedByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportNaConsolidatedByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportNaConsolidatedByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
