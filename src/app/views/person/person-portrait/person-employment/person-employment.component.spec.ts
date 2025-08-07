import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEmploymentComponent } from './person-employment.component';

describe('PersonEmploymentComponent', () => {
  let component: PersonEmploymentComponent;
  let fixture: ComponentFixture<PersonEmploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonEmploymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
