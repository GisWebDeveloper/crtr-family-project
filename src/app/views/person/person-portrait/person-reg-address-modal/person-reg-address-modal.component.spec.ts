import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegAddressModalComponent } from './person-reg-address-modal.component';

describe('PersonRegAddressModalComponent', () => {
  let component: PersonRegAddressModalComponent;
  let fixture: ComponentFixture<PersonRegAddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRegAddressModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRegAddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
