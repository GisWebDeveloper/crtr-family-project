import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainChildMonitoringComponent } from './stat-main-child-monitoring.component';

describe('StatMainChildMonitoringComponent', () => {
  let component: StatMainChildMonitoringComponent;
  let fixture: ComponentFixture<StatMainChildMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainChildMonitoringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainChildMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
