import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTzhsListModalComponent } from './dynamic-tzhs-list-modal.component';

describe('DynamicTzhsListModalComponent', () => {
  let component: DynamicTzhsListModalComponent;
  let fixture: ComponentFixture<DynamicTzhsListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTzhsListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTzhsListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
