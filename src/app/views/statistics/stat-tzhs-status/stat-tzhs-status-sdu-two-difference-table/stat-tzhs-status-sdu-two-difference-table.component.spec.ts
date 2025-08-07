import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusSduTwoDifferenceTableComponent } from './stat-tzhs-status-sdu-two-difference-table.component';

describe('StatTzhsStatusSduTwoDifferenceTableComponent', () => {
  let component: StatTzhsStatusSduTwoDifferenceTableComponent;
  let fixture: ComponentFixture<StatTzhsStatusSduTwoDifferenceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusSduTwoDifferenceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusSduTwoDifferenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
