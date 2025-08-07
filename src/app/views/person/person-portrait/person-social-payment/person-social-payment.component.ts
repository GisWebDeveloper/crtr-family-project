import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {SourceInfo} from "../../../../models/common/source-info";

@Component({
    selector: 'app-person-social-payment',
    templateUrl: './person-social-payment.component.html',
    styleUrls: ['./person-social-payment.component.scss']
})
export class PersonSocialPaymentComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showSocialPayment: EventEmitter<Array<SourceInfo>>;

    personSourceList: Array<SourceInfo>;

    constructor() {
    }

    ngOnInit(): void {
        this.personSourceList = new Array<SourceInfo>();
        this.showSocialPayment.asObservable().subscribe(sourceList => {
            this.personSourceList = sourceList.filter(ps => ps.sumLast);
        });
    }

}
