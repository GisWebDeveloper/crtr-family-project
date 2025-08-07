import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {RealEstate} from "../../../../models/common/real-estate";

@Component({
    selector: 'app-person-real-estate',
    templateUrl: './person-real-estate.component.html',
    styleUrls: ['./person-real-estate.component.scss']
})
export class PersonRealEstateComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showRealEstate: EventEmitter<Array<RealEstate>>;

    realEstateList: Array<RealEstate>;

    constructor() {
    }

    ngOnInit(): void {
        this.realEstateList = new Array<RealEstate>();
        this.showRealEstate.asObservable().subscribe(realEstateList => {
            this.realEstateList = realEstateList;
        });
    }

}
