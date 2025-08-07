import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Education} from "../../../../models/common/education";

@Component({
    selector: 'app-person-education',
    templateUrl: './person-education.component.html',
    styleUrls: ['./person-education.component.scss']
})
export class PersonEducationComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showEducation: EventEmitter<Array<Education>>;

    education: Education | null;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.showEducation.asObservable().subscribe(educationList => {
            this.education = null;
            if (educationList && educationList.length > 0) {
                this.education = educationList[educationList.length - 1];
            }
        });
    }

}
