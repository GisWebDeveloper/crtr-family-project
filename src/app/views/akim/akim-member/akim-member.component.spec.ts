import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AkimMemberComponent } from './akim-member.component';

describe('AkimMemberComponent', () => {
  let component: AkimMemberComponent;
  let fixture: ComponentFixture<AkimMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AkimMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AkimMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
