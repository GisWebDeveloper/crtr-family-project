import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasTzhsComponent } from './kandas-tzhs.component';

describe('KandasTzhsComponent', () => {
  let component: KandasTzhsComponent;
  let fixture: ComponentFixture<KandasTzhsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasTzhsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasTzhsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
