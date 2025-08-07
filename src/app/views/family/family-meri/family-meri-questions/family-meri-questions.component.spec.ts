import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMeriQuestionsComponent } from './family-meri-questions.component';

describe('FamilyMeriQuestionsComponent', () => {
  let component: FamilyMeriQuestionsComponent;
  let fixture: ComponentFixture<FamilyMeriQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMeriQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMeriQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
