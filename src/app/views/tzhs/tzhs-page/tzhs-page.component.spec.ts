import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzhsPageComponent } from './tzhs-page.component';

describe('TzhsPageComponent', () => {
  let component: TzhsPageComponent;
  let fixture: ComponentFixture<TzhsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TzhsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TzhsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
