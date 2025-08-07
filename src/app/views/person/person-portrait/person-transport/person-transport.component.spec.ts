import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonTransportComponent } from './person-transport.component';

describe('PersonTransportComponent', () => {
  let component: PersonTransportComponent;
  let fixture: ComponentFixture<PersonTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
