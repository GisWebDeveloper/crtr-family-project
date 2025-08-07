import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationActionLogComponent } from './administration-action-log.component';

describe('AdministrationActionLogComponent', () => {
  let component: AdministrationActionLogComponent;
  let fixture: ComponentFixture<AdministrationActionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationActionLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationActionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
