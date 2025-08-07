import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GovAgencyMzListComponent } from './gov-agency-mz-list.component';

describe('GovAgencyMzListComponent', () => {
  let component: GovAgencyMzListComponent;
  let fixture: ComponentFixture<GovAgencyMzListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GovAgencyMzListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GovAgencyMzListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
