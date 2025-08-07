import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTzhsThirdNewComponent } from './dynamic-tzhs-third-new.component';

describe('DinamicTzhsThirdNewComponent', () => {
  let component: DynamicTzhsThirdNewComponent;
  let fixture: ComponentFixture<DynamicTzhsThirdNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTzhsThirdNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTzhsThirdNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
