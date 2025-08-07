import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovRepDeListModalComponent } from './gov-rep-de-list-modal.component';

describe('GovRepDeListModalComponent', () => {
  let component: GovRepDeListModalComponent;
  let fixture: ComponentFixture<GovRepDeListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovRepDeListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovRepDeListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
