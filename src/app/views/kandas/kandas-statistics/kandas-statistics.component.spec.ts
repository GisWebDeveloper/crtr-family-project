import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasStatisticsComponent } from './kandas-statistics.component';

describe('KandasStatisticsComponent', () => {
  let component: KandasStatisticsComponent;
  let fixture: ComponentFixture<KandasStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
