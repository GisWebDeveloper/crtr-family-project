import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatTzhsStatusComponent } from './stat-tzhs-status.component';

describe('StatTzhsStatusComponent', () => {
  let component: StatTzhsStatusComponent;
  let fixture: ComponentFixture<StatTzhsStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatTzhsStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatTzhsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
