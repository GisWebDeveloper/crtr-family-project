import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMfListComponent } from './gov-agency-mf-list.component';

describe('GovAgencyMfListComponent', () => {
  let component: GovAgencyMfListComponent;
  let fixture: ComponentFixture<GovAgencyMfListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMfListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
