import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PereselencyTzhsComponent } from './pereselency-tzhs.component';

describe('PereselencyTzhsComponent', () => {
  let component: PereselencyTzhsComponent;
  let fixture: ComponentFixture<PereselencyTzhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PereselencyTzhsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PereselencyTzhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
