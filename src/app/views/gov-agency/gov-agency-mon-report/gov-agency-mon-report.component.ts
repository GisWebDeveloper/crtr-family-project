import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {UtilService} from "../../../services/util.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {DataService} from "../../../services/data.service";
import {GovAgencyService} from "../../../services/gov-agency.service";

@Component({
    selector: 'app-gov-agency-mon-report',
    templateUrl: './gov-agency-mon-report.component.html',
    styleUrls: ['./gov-agency-mon-report.component.scss']
})
export class GovAgencyMonReportComponent implements OnInit {

    // 0. FILTER
    visible = [true];

    dictionaryReport: Array<Dictionary> = [];
    reportCategory: Dictionary | undefined;

    constructor(
        private dictionaryService: DictionaryService,
        public govAgencyService: GovAgencyService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MON_LIST_CODE_PREFIX).subscribe({
            next: response => {
                this.dictionaryReport = response;
                this.reportCategory = this.dictionaryReport.find(item => item.code == GovAgencyService.MON_LIST_GARDEN_CODE);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
        setTimeout(() => {
        }, DataService.EVENT_DELAY_500);
    }

    setReportCategory(reportCategory: Dictionary) {
        this.reportCategory = reportCategory;
    }
}
