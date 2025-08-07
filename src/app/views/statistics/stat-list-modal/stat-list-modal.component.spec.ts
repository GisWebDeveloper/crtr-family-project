import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatListModalComponent } from './stat-list-modal.component';

describe('StatListModalComponent', () => {
  let component: StatListModalComponent;
  let fixture: ComponentFixture<StatListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
