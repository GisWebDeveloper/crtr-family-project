import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasListModalComponent } from './kandas-list-modal.component';

describe('KandasListModalComponent', () => {
  let component: KandasListModalComponent;
  let fixture: ComponentFixture<KandasListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
