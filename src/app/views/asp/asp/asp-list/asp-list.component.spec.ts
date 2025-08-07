import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspListComponent } from './asp-list.component';

describe('AspListComponent', () => {
  let component: AspListComponent;
  let fixture: ComponentFixture<AspListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AspListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AspListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
