import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringAspComponent } from './monitoring-asp.component';

describe('MonitoringAspComponent', () => {
  let component: MonitoringAspComponent;
  let fixture: ComponentFixture<MonitoringAspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringAspComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringAspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
