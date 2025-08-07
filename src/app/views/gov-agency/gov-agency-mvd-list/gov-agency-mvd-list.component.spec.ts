import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMvdListComponent } from './gov-agency-mvd-list.component';

describe('GovAgencyMvdListComponent', () => {
  let component: GovAgencyMvdListComponent;
  let fixture: ComponentFixture<GovAgencyMvdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMvdListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMvdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
