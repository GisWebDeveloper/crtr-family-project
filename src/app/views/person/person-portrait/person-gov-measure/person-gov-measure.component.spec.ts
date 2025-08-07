import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGovMeasureComponent } from './person-gov-measure.component';

describe('PersonGovMeasureComponent', () => {
  let component: PersonGovMeasureComponent;
  let fixture: ComponentFixture<PersonGovMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonGovMeasureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGovMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
