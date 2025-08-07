import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatMainFamilyTypeComponent } from './stat-main-family-type.component';

describe('StatMainFamilyTypeComponent', () => {
  let component: StatMainFamilyTypeComponent;
  let fixture: ComponentFixture<StatMainFamilyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatMainFamilyTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatMainFamilyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
