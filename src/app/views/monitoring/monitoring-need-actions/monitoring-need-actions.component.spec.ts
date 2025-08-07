import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringNeedActionsComponent } from './monitoring-need-actions.component';

describe('MonitoringNeedActionsComponent', () => {
  let component: MonitoringNeedActionsComponent;
  let fixture: ComponentFixture<MonitoringNeedActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringNeedActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringNeedActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
