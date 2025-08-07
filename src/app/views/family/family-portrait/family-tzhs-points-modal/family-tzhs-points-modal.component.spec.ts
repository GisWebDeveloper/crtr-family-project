import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTzhsPointsModalComponent } from './family-tzhs-points-modal.component';

describe('FamilyTzhsPointsModalComponent', () => {
  let component: FamilyTzhsPointsModalComponent;
  let fixture: ComponentFixture<FamilyTzhsPointsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyTzhsPointsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTzhsPointsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
