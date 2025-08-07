import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationNewFcComponent } from './segmentation-new-fc.component';

describe('SegmentationNewFcComponent', () => {
  let component: SegmentationNewFcComponent;
  let fixture: ComponentFixture<SegmentationNewFcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationNewFcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationNewFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
