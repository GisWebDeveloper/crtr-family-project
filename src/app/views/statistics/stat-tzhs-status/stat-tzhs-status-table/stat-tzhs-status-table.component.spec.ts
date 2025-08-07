import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusTableComponent } from './stat-tzhs-status-table.component';

describe('StatTzhsStatusComponent', () => {
  let component: StatTzhsStatusTableComponent;
  let fixture: ComponentFixture<StatTzhsStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
