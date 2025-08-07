import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainPopulationComponent } from './stat-main-population.component';

describe('StatMainPopulationComponent', () => {
  let component: StatMainPopulationComponent;
  let fixture: ComponentFixture<StatMainPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainPopulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
