import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusExtendedTableComponent } from './stat-tzhs-status-extended-table.component';

describe('StatTzhsStatusExtendedTableComponent', () => {
  let component: StatTzhsStatusExtendedTableComponent;
  let fixture: ComponentFixture<StatTzhsStatusExtendedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusExtendedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusExtendedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
