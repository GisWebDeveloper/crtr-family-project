import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRealEstateComponent } from './person-real-estate.component';

describe('PersonRealEstateComponent', () => {
  let component: PersonRealEstateComponent;
  let fixture: ComponentFixture<PersonRealEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRealEstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRealEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
