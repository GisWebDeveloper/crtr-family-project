import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainChildCountComponent } from './stat-main-child-count.component';

describe('StatMainChildCountComponent', () => {
  let component: StatMainChildCountComponent;
  let fixture: ComponentFixture<StatMainChildCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainChildCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainChildCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
