import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTimelineComponent } from './person-timeline.component';

describe('PersonTimelineComponent', () => {
  let component: PersonTimelineComponent;
  let fixture: ComponentFixture<PersonTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
