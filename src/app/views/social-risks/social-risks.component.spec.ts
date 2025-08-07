import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialRisksComponent } from './social-risks.component';

describe('SocialRisksComponent', () => {
  let component: SocialRisksComponent;
  let fixture: ComponentFixture<SocialRisksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialRisksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
