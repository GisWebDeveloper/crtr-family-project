import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {HR} from "../../../../models/common/hr";

@Component({
    selector: 'app-person-hr',
    templateUrl: './person-hr.component.html',
    styleUrls: ['./person-hr.component.scss']
})
export class PersonHrComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showHR: EventEmitter<Array<HR>>;

    personHrList: Array<HR>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.personHrList = new Array<HR>();
        this.showHR.asObservable().subscribe(hrList => {
            this.personHrList = hrList;
        });
    }

}
