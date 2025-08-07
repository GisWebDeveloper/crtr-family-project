import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyTzhsHistoryGraphComponent } from './family-tzhs-history-graph.component';

describe('FamilyTzhsHistoryGraphComponent', () => {
  let component: FamilyTzhsHistoryGraphComponent;
  let fixture: ComponentFixture<FamilyTzhsHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyTzhsHistoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyTzhsHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
