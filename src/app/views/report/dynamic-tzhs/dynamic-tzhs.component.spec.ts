import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTzhsComponent } from './dynamic-tzhs.component';

describe('NewComponentComponent', () => {
  let component: DynamicTzhsComponent;
  let fixture: ComponentFixture<DynamicTzhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTzhsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTzhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
