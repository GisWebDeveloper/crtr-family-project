import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAlimonyComponent } from './person-alimony.component';

describe('PersonAlimonyComponent', () => {
  let component: PersonAlimonyComponent;
  let fixture: ComponentFixture<PersonAlimonyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAlimonyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAlimonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
