import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {AgriculturalMachinery} from "../../../../models/common/agricultural-machinery";

@Component({
    selector: 'app-person-agricultural-machinery',
    templateUrl: './person-agricultural-machinery.component.html',
    styleUrls: ['./person-agricultural-machinery.component.scss']
})
export class PersonAgriculturalMachineryComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showAgriculturalMachinery: EventEmitter<Array<AgriculturalMachinery>>;

    personAmList: Array<AgriculturalMachinery>;

    constructor() {
    }

    ngOnInit(): void {
        this.personAmList = new Array<AgriculturalMachinery>();
        this.showAgriculturalMachinery.asObservable().subscribe(amList => {
            this.personAmList = amList;
        });
    }

}
