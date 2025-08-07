import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentationNewListModalComponent } from './segmentation-new-list-modal.component';

describe('SegmentationNewListModalComponent', () => {
  let component: SegmentationNewListModalComponent;
  let fixture: ComponentFixture<SegmentationNewListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentationNewListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentationNewListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
