import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {IndividualEntrepreneur} from "../../../../models/common/individual-entrepreneur";
import {UtilService} from "../../../../services/util.service";

@Component({
    selector: 'app-person-individual-entrepreneur',
    templateUrl: './person-individual-entrepreneur.component.html',
    styleUrls: ['./person-individual-entrepreneur.component.scss']
})
export class PersonIndividualEntrepreneurComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showIndividualEntrepreneur: EventEmitter<Array<IndividualEntrepreneur>>;

    individualEntrepreneurList: Array<IndividualEntrepreneur>;

    constructor(public translateService: TranslateService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.individualEntrepreneurList = new Array<IndividualEntrepreneur>();
        this.showIndividualEntrepreneur.asObservable().subscribe(ieList => {
            this.individualEntrepreneurList = ieList;
        });
    }

}
