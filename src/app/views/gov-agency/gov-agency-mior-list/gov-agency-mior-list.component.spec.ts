import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMiorListComponent } from './gov-agency-mior-list.component';

describe('GovAgencyMiorListComponent', () => {
  let component: GovAgencyMiorListComponent;
  let fixture: ComponentFixture<GovAgencyMiorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMiorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMiorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
