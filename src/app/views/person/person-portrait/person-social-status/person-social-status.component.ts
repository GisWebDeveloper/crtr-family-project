import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SourceInfo} from "../../../../models/common/source-info";

@Component({
    selector: 'app-person-social-status',
    templateUrl: './person-social-status.component.html',
    styleUrls: ['./person-social-status.component.scss']
})
export class PersonSocialStatusComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showSocialStatus: EventEmitter<Array<SourceInfo>>;

    personSourceList: Array<SourceInfo>;

    constructor() {
    }

    ngOnInit(): void {
        this.personSourceList = new Array<SourceInfo>();
        this.showSocialStatus.asObservable().subscribe(sourceList => {
            this.personSourceList = sourceList;
        });
    }

}
