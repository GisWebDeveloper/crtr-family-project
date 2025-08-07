import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {GovernmentMeasure} from "../../../../models/common/gov-measure";

@Component({
    selector: 'app-person-gov-measure',
    templateUrl: './person-gov-measure.component.html',
    styleUrls: ['./person-gov-measure.component.scss']
})
export class PersonGovMeasureComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showGovMeasure: EventEmitter<Array<GovernmentMeasure>>;

    govMeasureList: Array<GovernmentMeasure>;

    constructor() {
    }

    ngOnInit(): void {
        this.govMeasureList = new Array<GovernmentMeasure>();
        this.showGovMeasure.asObservable().subscribe(gmList => {
            this.govMeasureList = gmList.filter(gm => gm.name);
        });
    }

}
