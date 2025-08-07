import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Employment} from "../../../../models/common/employment";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-person-employment',
    templateUrl: './person-employment.component.html',
    styleUrls: ['./person-employment.component.scss']
})
export class PersonEmploymentComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showEmployment: EventEmitter<Array<Employment>>;

    employmentList: Array<Employment>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.employmentList = new Array<Employment>();
        this.showEmployment.asObservable().subscribe(employmentList => {
            this.employmentList = employmentList;
        });
    }

}
