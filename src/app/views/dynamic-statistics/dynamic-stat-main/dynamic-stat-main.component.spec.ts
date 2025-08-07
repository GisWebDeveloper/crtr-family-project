import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicStatMainComponent } from './dynamic-stat-main.component';

describe('DynamicStatMainComponent', () => {
  let component: DynamicStatMainComponent;
  let fixture: ComponentFixture<DynamicStatMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicStatMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStatMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
