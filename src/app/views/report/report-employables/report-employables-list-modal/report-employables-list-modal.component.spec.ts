import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmployablesListModalComponent } from './report-employables-list-modal.component';

describe('ReportEmployablesListModalComponent', () => {
  let component: ReportEmployablesListModalComponent;
  let fixture: ComponentFixture<ReportEmployablesListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportEmployablesListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmployablesListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
