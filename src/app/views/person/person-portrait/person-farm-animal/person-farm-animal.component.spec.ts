import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFarmAnimalComponent } from './person-farm-animal.component';

describe('PersonFarmAnimalComponent', () => {
  let component: PersonFarmAnimalComponent;
  let fixture: ComponentFixture<PersonFarmAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFarmAnimalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFarmAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
