import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationFcComponent } from './segmentation-fc.component';

describe('SegmentationFcComponent', () => {
  let component: SegmentationFcComponent;
  let fixture: ComponentFixture<SegmentationFcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationFcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
