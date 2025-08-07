import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMonListComponent } from './gov-agency-mon-list.component';

describe('GovAgencyMonListComponent', () => {
  let component: GovAgencyMonListComponent;
  let fixture: ComponentFixture<GovAgencyMonListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMonListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
