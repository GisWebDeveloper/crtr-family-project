import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringIncorrectDataComponent } from './monitoring-incorrect-data.component';

describe('MonitoringIncorrectDataComponent', () => {
  let component: MonitoringIncorrectDataComponent;
  let fixture: ComponentFixture<MonitoringIncorrectDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringIncorrectDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringIncorrectDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
