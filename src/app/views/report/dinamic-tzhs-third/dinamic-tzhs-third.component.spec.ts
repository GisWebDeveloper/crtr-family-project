import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicTzhsThirdComponent } from './dinamic-tzhs-third.component';

describe('DinamicTzhsThirdComponent', () => {
  let component: DinamicTzhsThirdComponent;
  let fixture: ComponentFixture<DinamicTzhsThirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DinamicTzhsThirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicTzhsThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
