import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovRepDEComponent } from './gov-rep-de.component';

describe('GovRepDEComponent', () => {
  let component: GovRepDEComponent;
  let fixture: ComponentFixture<GovRepDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovRepDEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovRepDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
