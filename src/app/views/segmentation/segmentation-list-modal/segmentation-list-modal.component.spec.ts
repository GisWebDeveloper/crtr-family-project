import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationListModalComponent } from './segmentation-list-modal.component';

describe('SegmentationListModalComponent', () => {
  let component: SegmentationListModalComponent;
  let fixture: ComponentFixture<SegmentationListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
