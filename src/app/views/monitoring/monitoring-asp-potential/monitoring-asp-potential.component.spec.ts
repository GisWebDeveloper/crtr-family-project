import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAspPotentialComponent } from './monitoring-asp-potential.component';

describe('MonitoringAspPotentialComponent', () => {
  let component: MonitoringAspPotentialComponent;
  let fixture: ComponentFixture<MonitoringAspPotentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAspPotentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAspPotentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
