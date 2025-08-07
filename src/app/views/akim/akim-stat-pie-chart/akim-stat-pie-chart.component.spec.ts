import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkimStatPieChartComponent } from './akim-stat-pie-chart.component';

describe('AkimStatPieChartComponent', () => {
  let component: AkimStatPieChartComponent;
  let fixture: ComponentFixture<AkimStatPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkimStatPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkimStatPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
