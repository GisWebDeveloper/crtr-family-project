import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTzhsExternalComponent } from './dynamic-tzhs-external.component';

describe('DinamicTzhsExternalComponent', () => {
  let component: DynamicTzhsExternalComponent;
  let fixture: ComponentFixture<DynamicTzhsExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTzhsExternalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTzhsExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
