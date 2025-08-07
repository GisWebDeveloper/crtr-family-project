import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLandComponent } from './person-land.component';

describe('PersonLandComponent', () => {
  let component: PersonLandComponent;
  let fixture: ComponentFixture<PersonLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonLandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
