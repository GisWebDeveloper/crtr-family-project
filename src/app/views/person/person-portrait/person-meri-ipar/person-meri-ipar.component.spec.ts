import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMeriIparComponent } from './person-meri-ipar.component';

describe('PersonMeriIparComponent', () => {
  let component: PersonMeriIparComponent;
  let fixture: ComponentFixture<PersonMeriIparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMeriIparComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMeriIparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
