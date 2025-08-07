import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPsConsolidatedByCategoryComponent } from './report-ps-consolidated-by-category.component';

describe('ReportPsConsolidatedByCategoryComponent', () => {
  let component: ReportPsConsolidatedByCategoryComponent;
  let fixture: ComponentFixture<ReportPsConsolidatedByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportPsConsolidatedByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPsConsolidatedByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
