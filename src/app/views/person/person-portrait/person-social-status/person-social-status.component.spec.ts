import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PersonSocialStatusComponent} from './person-social-status.component';

describe('PersonSocialStatusComponent', () => {
    let component: PersonSocialStatusComponent;
    let fixture: ComponentFixture<PersonSocialStatusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PersonSocialStatusComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonSocialStatusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
