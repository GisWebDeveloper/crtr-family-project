import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMeriComponent } from './family-meri.component';

describe('FamilyMeriComponent', () => {
  let component: FamilyMeriComponent;
  let fixture: ComponentFixture<FamilyMeriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMeriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMeriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
