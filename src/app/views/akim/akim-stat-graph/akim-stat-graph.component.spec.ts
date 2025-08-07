import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkimStatGraphComponent } from './akim-stat-graph.component';

describe('AkimStatGraphComponent', () => {
  let component: AkimStatGraphComponent;
  let fixture: ComponentFixture<AkimStatGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkimStatGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkimStatGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
