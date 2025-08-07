import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringChildPathComponent } from './monitoring-child-path.component';

describe('MonitoringChildPathComponent', () => {
  let component: MonitoringChildPathComponent;
  let fixture: ComponentFixture<MonitoringChildPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringChildPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringChildPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
