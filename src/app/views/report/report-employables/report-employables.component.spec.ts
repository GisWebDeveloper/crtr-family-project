import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmployablesComponent } from './report-employables.component';

describe('ReportEmployablesComponent', () => {
  let component: ReportEmployablesComponent;
  let fixture: ComponentFixture<ReportEmployablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEmployablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmployablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
