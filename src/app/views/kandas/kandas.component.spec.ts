import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasComponent } from './kandas.component';

describe('KandasComponent', () => {
  let component: KandasComponent;
  let fixture: ComponentFixture<KandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
