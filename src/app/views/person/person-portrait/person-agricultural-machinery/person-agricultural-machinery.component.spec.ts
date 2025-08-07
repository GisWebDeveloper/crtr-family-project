import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAgriculturalMachineryComponent } from './person-agricultural-machinery.component';

describe('PersonAgriculturalMachineryComponent', () => {
  let component: PersonAgriculturalMachineryComponent;
  let fixture: ComponentFixture<PersonAgriculturalMachineryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonAgriculturalMachineryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAgriculturalMachineryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
