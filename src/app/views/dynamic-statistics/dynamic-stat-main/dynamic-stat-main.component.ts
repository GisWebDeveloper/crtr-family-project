import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {ReportService} from "../../../services/report.service";

@Component({
    selector: 'app-dynamic-stat-main',
    templateUrl: './dynamic-stat-main.component.html',
    styleUrls: ['./dynamic-stat-main.component.scss']
})
export class DynamicStatMainComponent implements OnInit, AfterViewInit {

    @Output() eventSearchStatusStat: EventEmitter<{search: string, iin: string}> = new EventEmitter<{search: string, iin: string}>();

    visible = [true];

    statType: string = 'POPULATION';

    statToTable = new Map([
        ['POPULATION', 'REP01'],
        ['FAMILY-TYPE', 'REP02'],
        ['TZHS-STATUS', 'REP03'],
        ['MEMBER-COUNT', 'REP04'],
        ['CHILD-COUNT', 'REP05'],
        ['INCOME-PM', 'REP06'],
        ['SUSN', 'REP07']
    ]);

    constructor(public utilService: UtilService,
                public reportService: ReportService) {
    }

    ngAfterViewInit(): void {
        // @ts-ignore
        this.eventSearchStatusStat.emit({search: this.statToTable.get(this.statType), iin: ''});
    }

    ngOnInit(): void {

    }

    search(newStatType: string) {
        if (this.statToTable.has(newStatType)) {
            this.statType = newStatType;
            // @ts-ignore
            this.eventSearchStatusStat.emit({search: this.statToTable.get(this.statType), iin: ''});
        }
    }
}
