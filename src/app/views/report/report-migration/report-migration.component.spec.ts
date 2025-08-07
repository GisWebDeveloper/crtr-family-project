import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMigrationComponent } from './report-migration.component';

describe('ReportMigrationComponent', () => {
  let component: ReportMigrationComponent;
  let fixture: ComponentFixture<ReportMigrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMigrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMigrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
