import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SocialStatusesComponent} from './social-statuses.component';

describe('SocialStatusesComponent', () => {
    let component: SocialStatusesComponent;
    let fixture: ComponentFixture<SocialStatusesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SocialStatusesComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SocialStatusesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
