import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Transport} from "../../../../models/common/transport";
import {TranslateService} from "@ngx-translate/core";
import {MeriIpar} from "../../../../models/common/meri-ipar";

@Component({
  selector: 'app-person-meri-ipar',
  templateUrl: './person-meri-ipar.component.html',
  styleUrls: ['./person-meri-ipar.component.scss']
})
export class PersonMeriIparComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showMeriIpar: EventEmitter<Array<MeriIpar>>;

    meriIpars: Array<MeriIpar>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.meriIpars = new Array<MeriIpar>();
        this.showMeriIpar.asObservable().subscribe(temp => {
            this.meriIpars = temp;
        });
    }

}
