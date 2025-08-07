import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonIncomeComponent } from './person-income.component';

describe('PersonIncomeComponent', () => {
  let component: PersonIncomeComponent;
  let fixture: ComponentFixture<PersonIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
