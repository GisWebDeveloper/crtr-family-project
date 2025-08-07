import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GovAgencyMonReportGardenComponent} from './gov-agency-mon-report-garden.component';

describe('GovAgencyMonReportGardenComponent', () => {
    let component: GovAgencyMonReportGardenComponent;
    let fixture: ComponentFixture<GovAgencyMonReportGardenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GovAgencyMonReportGardenComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GovAgencyMonReportGardenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
