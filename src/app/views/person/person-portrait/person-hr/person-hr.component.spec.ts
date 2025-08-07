import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonHrComponent } from './person-hr.component';

describe('PersonHrComponent', () => {
  let component: PersonHrComponent;
  let fixture: ComponentFixture<PersonHrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonHrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
