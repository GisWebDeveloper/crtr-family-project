import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLegalEntityComponent } from './person-legal-entity.component';

describe('PersonLegalEntityComponent', () => {
  let component: PersonLegalEntityComponent;
  let fixture: ComponentFixture<PersonLegalEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonLegalEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
