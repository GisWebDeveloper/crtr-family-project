import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseUpdateLogModalComponent } from './database-update-log-modal.component';

describe('DatabaseUpdateLogModalComponent', () => {
  let component: DatabaseUpdateLogModalComponent;
  let fixture: ComponentFixture<DatabaseUpdateLogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseUpdateLogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseUpdateLogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
