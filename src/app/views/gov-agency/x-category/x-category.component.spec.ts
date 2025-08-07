import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XCategoryComponent } from './x-category.component';

describe('XCategoryComponent', () => {
  let component: XCategoryComponent;
  let fixture: ComponentFixture<XCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
