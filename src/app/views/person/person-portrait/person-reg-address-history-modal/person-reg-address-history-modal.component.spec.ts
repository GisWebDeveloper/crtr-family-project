import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRegAddressHistoryModalComponent } from './person-reg-address-history-modal.component';

describe('PersonRegAddressHistoryModalComponent', () => {
  let component: PersonRegAddressHistoryModalComponent;
  let fixture: ComponentFixture<PersonRegAddressHistoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonRegAddressHistoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRegAddressHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
