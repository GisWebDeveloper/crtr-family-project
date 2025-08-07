import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasFormComponent } from './kandas-form.component';

describe('KandasFormComponent', () => {
  let component: KandasFormComponent;
  let fixture: ComponentFixture<KandasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
