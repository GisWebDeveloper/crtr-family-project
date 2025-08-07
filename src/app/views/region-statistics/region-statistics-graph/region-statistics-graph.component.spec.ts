import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStatisticsGraphComponent } from './region-statistics-graph.component';

describe('RegionStatisticsGraphComponent', () => {
  let component: RegionStatisticsGraphComponent;
  let fixture: ComponentFixture<RegionStatisticsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionStatisticsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionStatisticsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
