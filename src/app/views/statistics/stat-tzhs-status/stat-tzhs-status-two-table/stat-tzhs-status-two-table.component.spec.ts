import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusTwoTableComponent } from './stat-tzhs-status-two-table.component';

describe('StatTzhsStatusTwoTableComponent', () => {
  let component: StatTzhsStatusTwoTableComponent;
  let fixture: ComponentFixture<StatTzhsStatusTwoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusTwoTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusTwoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
