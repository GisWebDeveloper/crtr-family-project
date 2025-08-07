import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEducationComponent } from './person-education.component';

describe('PersonEducationComponent', () => {
  let component: PersonEducationComponent;
  let fixture: ComponentFixture<PersonEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
