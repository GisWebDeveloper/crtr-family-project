import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIndividualEntrepreneurComponent } from './person-individual-entrepreneur.component';

describe('PersonIndividualEntrepreneurComponent', () => {
  let component: PersonIndividualEntrepreneurComponent;
  let fixture: ComponentFixture<PersonIndividualEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonIndividualEntrepreneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonIndividualEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
