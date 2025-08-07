import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPortraitComponent } from './person-portrait.component';

describe('PersonPortraitComponent', () => {
  let component: PersonPortraitComponent;
  let fixture: ComponentFixture<PersonPortraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonPortraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
