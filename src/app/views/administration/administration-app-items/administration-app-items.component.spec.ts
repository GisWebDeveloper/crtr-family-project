import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationAppItemsComponent } from './administration-app-items.component';

describe('AdministrationAppItemsComponent', () => {
  let component: AdministrationAppItemsComponent;
  let fixture: ComponentFixture<AdministrationAppItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationAppItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationAppItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
