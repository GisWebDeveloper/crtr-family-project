import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessityComponent } from './necessity.component';

describe('NecessityComponent', () => {
  let component: NecessityComponent;
  let fixture: ComponentFixture<NecessityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NecessityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NecessityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
