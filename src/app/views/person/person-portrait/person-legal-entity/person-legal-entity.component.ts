import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../../services/util.service";
import {LegalEntity} from "../../../../models/common/legal-entity";

@Component({
    selector: 'app-person-legal-entity',
    templateUrl: './person-legal-entity.component.html',
    styleUrls: ['./person-legal-entity.component.scss']
})
export class PersonLegalEntityComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showLegalEntity: EventEmitter<Array<LegalEntity>>;

    legalEntityList: Array<LegalEntity>;

    constructor(public translateService: TranslateService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.legalEntityList = new Array<LegalEntity>();
        this.showLegalEntity.asObservable().subscribe(leList => {
            this.legalEntityList = leList;
        });
    }

}
