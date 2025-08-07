import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSocialPaymentComponent } from './person-social-payment.component';

describe('PersonSocialPaymentComponent', () => {
    let component: PersonSocialPaymentComponent;
    let fixture: ComponentFixture<PersonSocialPaymentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ PersonSocialPaymentComponent ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonSocialPaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
