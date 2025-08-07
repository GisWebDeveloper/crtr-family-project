import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppItemsModalComponent } from './app-items-modal.component';

describe('AppItemsModalComponent', () => {
  let component: AppItemsModalComponent;
  let fixture: ComponentFixture<AppItemsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppItemsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppItemsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
