import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusSduTableComponent } from './stat-tzhs-status-sdu-table.component';

describe('StatTzhsStatusSduTableComponent', () => {
  let component: StatTzhsStatusSduTableComponent;
  let fixture: ComponentFixture<StatTzhsStatusSduTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusSduTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusSduTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
