import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStatisticsGraphModalComponent } from './region-statistics-graph-modal.component';

describe('RegionStatisticsGraphModalComponent', () => {
  let component: RegionStatisticsGraphModalComponent;
  let fixture: ComponentFixture<RegionStatisticsGraphModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionStatisticsGraphModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionStatisticsGraphModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
