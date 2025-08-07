import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";

@Component({
    selector: 'app-gov-agency-mon-report-search',
    templateUrl: './gov-agency-mon-report-search.component.html',
    styleUrls: ['./gov-agency-mon-report-search.component.scss']
})
export class GovAgencyMonReportSearchComponent implements OnInit {

    @Input() dictionaryReport: Array<Dictionary>;
    @Output() selectedReportCategory = new EventEmitter<Dictionary>();

    visible = [true];
    reportCategory: Dictionary | undefined;

    constructor(public utilService: UtilService) {
    }

    ngOnInit(): void {
    }

    search() {
        this.selectedReportCategory.emit(this.reportCategory);
    }

}
