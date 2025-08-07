import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStatisticsComponent } from './region-statistics.component';

describe('PopulationRatingComponent', () => {
  let component: RegionStatisticsComponent;
  let fixture: ComponentFixture<RegionStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
