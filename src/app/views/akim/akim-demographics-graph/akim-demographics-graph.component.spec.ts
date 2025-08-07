import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkimDemographicsGraphComponent } from './akim-demographics-graph.component';

describe('AkimDemographicsGraphComponent', () => {
  let component: AkimDemographicsGraphComponent;
  let fixture: ComponentFixture<AkimDemographicsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkimDemographicsGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkimDemographicsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
