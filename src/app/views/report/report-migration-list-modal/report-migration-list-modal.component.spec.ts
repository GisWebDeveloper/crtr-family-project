import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMigrationListModalComponent } from './report-migration-list-modal.component';

describe('ReportMigrationListModalComponent', () => {
  let component: ReportMigrationListModalComponent;
  let fixture: ComponentFixture<ReportMigrationListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMigrationListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMigrationListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
