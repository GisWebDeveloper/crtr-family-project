import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KandasNewStatisticsComponent } from './kandas-new-statistics.component';

describe('KandasNewStatisticsComponent', () => {
  let component: KandasNewStatisticsComponent;
  let fixture: ComponentFixture<KandasNewStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KandasNewStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KandasNewStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
