import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmployablesCategoryComponent } from './report-employables-category.component';

describe('ReportEmployablesCategoryComponent', () => {
  let component: ReportEmployablesCategoryComponent;
  let fixture: ComponentFixture<ReportEmployablesCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEmployablesCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmployablesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
