import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasFormNewComponent } from './kandas-form-new.component';

describe('KandasFormNewComponent', () => {
  let component: KandasFormNewComponent;
  let fixture: ComponentFixture<KandasFormNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasFormNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasFormNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
