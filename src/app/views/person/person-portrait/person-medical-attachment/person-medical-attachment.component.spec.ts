import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMedicalAttachmentComponent } from './person-medical-attachment.component';

describe('PersonMedicalAttachmentComponent', () => {
  let component: PersonMedicalAttachmentComponent;
  let fixture: ComponentFixture<PersonMedicalAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonMedicalAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMedicalAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
