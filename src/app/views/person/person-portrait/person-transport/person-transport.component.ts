import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Transport} from "../../../../models/common/transport";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-person-transport',
    templateUrl: './person-transport.component.html',
    styleUrls: ['./person-transport.component.scss']
})
export class PersonTransportComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showTransport: EventEmitter<Array<Transport>>;

    transportList: Array<Transport>;

    constructor(public translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.transportList = new Array<Transport>();
        this.showTransport.asObservable().subscribe(transportList => {
            this.transportList = transportList;
        });
    }

}
