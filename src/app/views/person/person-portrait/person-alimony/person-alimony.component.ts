import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Alimony} from "../../../../models/common/alimony";

@Component({
    selector: 'app-person-alimony',
    templateUrl: './person-alimony.component.html',
    styleUrls: ['./person-alimony.component.scss']
})
export class PersonAlimonyComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showAlimony: EventEmitter<Array<Alimony>>;

    alimonyList: Array<Alimony>;

    constructor() {
    }

    ngOnInit(): void {
        this.alimonyList = new Array<Alimony>();
        this.showAlimony.asObservable().subscribe(alimonyList => {
            this.alimonyList = alimonyList;
        });
    }

}
