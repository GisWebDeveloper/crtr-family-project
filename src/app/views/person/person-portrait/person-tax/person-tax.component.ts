import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Transport} from "../../../../models/common/transport";
import {TranslateService} from "@ngx-translate/core";
import {PersonTax} from "../../../../models/person/person-tax";

@Component({
  selector: 'app-person-tax',
  templateUrl: './person-tax.component.html',
  styleUrls: ['./person-tax.component.scss']
})
export class PersonTaxComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showTax: EventEmitter<Array<PersonTax>>;

    taxList: Array<PersonTax>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.taxList = new Array<PersonTax>();
        this.showTax.asObservable().subscribe(tax => {
            this.taxList = tax;
        });
    }

}
