import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspReportComponent } from './asp-report.component';

describe('AspReportComponent', () => {
  let component: AspReportComponent;
  let fixture: ComponentFixture<AspReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
