import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTaxComponent } from './person-tax.component';

describe('PersonTaxComponent', () => {
  let component: PersonTaxComponent;
  let fixture: ComponentFixture<PersonTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
