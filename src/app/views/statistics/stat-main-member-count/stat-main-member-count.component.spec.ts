import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainMemberCountComponent } from './stat-main-member-count.component';

describe('StatMainMemberCountComponent', () => {
  let component: StatMainMemberCountComponent;
  let fixture: ComponentFixture<StatMainMemberCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainMemberCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainMemberCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
