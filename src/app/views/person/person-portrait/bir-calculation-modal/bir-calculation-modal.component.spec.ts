import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirCalculationModalComponent } from './bir-calculation-modal.component';

describe('BirCalculationModalComponent', () => {
  let component: BirCalculationModalComponent;
  let fixture: ComponentFixture<BirCalculationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirCalculationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirCalculationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
