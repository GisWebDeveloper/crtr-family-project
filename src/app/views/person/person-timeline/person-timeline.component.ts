import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {UtilService} from "../../../services/util.service";
import {Timeline} from "../../../models/common/timeline";
import {TranslateService} from "@ngx-translate/core";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-person-timeline',
    templateUrl: './person-timeline.component.html',
    styleUrls: ['./person-timeline.component.scss']
})
export class PersonTimelineComponent implements OnInit {

    iin: string;
    timelineList: Array<Timeline> = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private personService: PersonService,
        private router: Router,
        private translateService: TranslateService,
        private userRoleService: UserRoleService,
        private utilService: UtilService) {
        if (!this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_TIMELINE)) {
            this.router.navigate(['']).then();
        }
    }

    ngOnInit(): void {


        this.iin = this.activatedRoute.snapshot.paramMap.get('iin') || "";

        this.personService.getPersonTimeline(this.iin).subscribe({
            next: response => {

                this.timelineList = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    openPersonPortrait() {
        this.router.navigate(['family/' + this.iin]).then();
    }

    getDateDescription(dateValue: string): string {
        let date = this.utilService.stringToDate(dateValue);
        // @ts-ignore
        let dateFormatted = date?.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
        return dateFormatted ? dateFormatted : dateValue;
    }

    getAgeDescription(ageValue: string): string {
        let years = +ageValue.split(".")[0], months = +ageValue.split(".")[1], yearsDesc = '', monthsDesc = '';
        if (years > 0) {
            const yearsMod = years % 10;
            yearsDesc = years + '' + (yearsMod >= 1 && yearsMod <= 4 ? this.utilService.getTranslationValue('date.year-short') : this.utilService.getTranslationValue('date.years-short'));
        }
        if (months > 0) {
            monthsDesc = months + '' + this.utilService.getTranslationValue('date.month-short');
        }
        //const ageLabel = yearsDesc || monthsDesc ? this.utilService.getTranslationValue('timeline.age') + ': ' : '';
        return [yearsDesc, monthsDesc].filter(Boolean).join(' ');
    }

    getTimelineType(timeline: Timeline): string {
        return timeline.timelineDictionary && timeline.timelineDictionary.type ? timeline.timelineDictionary.type.toUpperCase() : '';
    }

}
