import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainIncomePmComponent } from './stat-main-income-pm.component';

describe('StatMainIncomePmComponent', () => {
  let component: StatMainIncomePmComponent;
  let fixture: ComponentFixture<StatMainIncomePmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainIncomePmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainIncomePmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
