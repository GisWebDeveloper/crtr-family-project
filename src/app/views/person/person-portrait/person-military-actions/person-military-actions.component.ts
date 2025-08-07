import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {MilitaryAction} from "../../../../models/common/military-action";
import {UtilService} from "../../../../services/util.service";

@Component({
    selector: 'app-person-military-actions',
    templateUrl: './person-military-actions.component.html',
    styleUrls: ['./person-military-actions.component.scss']
})
export class PersonMilitaryActionsComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showMilitaryActions: EventEmitter<Array<MilitaryAction>>;

    militaryActionList: Array<MilitaryAction>;

    constructor(public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.militaryActionList = new Array<MilitaryAction>();
        this.showMilitaryActions.asObservable().subscribe(maList => {
            this.militaryActionList = maList;
        });
    }

}
