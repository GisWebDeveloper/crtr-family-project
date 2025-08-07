import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMilitaryActionsComponent } from './person-military-actions.component';

describe('PersonMilitaryActionsComponent', () => {
  let component: PersonMilitaryActionsComponent;
  let fixture: ComponentFixture<PersonMilitaryActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMilitaryActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMilitaryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
