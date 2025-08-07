import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainSusnComponent } from './stat-main-susn.component';

describe('StatMainSusnComponent', () => {
  let component: StatMainSusnComponent;
  let fixture: ComponentFixture<StatMainSusnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainSusnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainSusnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
