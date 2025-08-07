import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {RealEstate} from "../../../../models/common/real-estate";

@Component({
    selector: 'app-person-land',
    templateUrl: './person-land.component.html',
    styleUrls: ['./person-land.component.scss']
})
export class PersonLandComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showLand: EventEmitter<Array<RealEstate>>;

    landList: Array<RealEstate>;

    constructor() {
    }

    ngOnInit(): void {
        this.landList = new Array<RealEstate>();
        this.showLand.asObservable().subscribe(landList => {
            this.landList = landList;
        });
    }

}
