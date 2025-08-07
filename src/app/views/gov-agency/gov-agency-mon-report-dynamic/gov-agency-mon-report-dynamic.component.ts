import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {UtilService} from "../../../services/util.service";
import {DataService} from "../../../services/data.service";
import {Region} from "../../../models/region";

@Component({
    selector: 'app-gov-agency-mon-report-dynamic',
    templateUrl: './gov-agency-mon-report-dynamic.component.html',
    styleUrls: ['./gov-agency-mon-report-dynamic.component.scss']
})
export class GovAgencyMonReportDynamicComponent implements OnInit {

    @Output() eventShowListModal = new EventEmitter<{
        category: Dictionary,
        region?: Region,
        cntId: number,
        cntName: string
    }>();

    // 0. FILTER
    visible = [true];

    dictionaryReport: Array<Dictionary> = [];
    reportCategory?: Dictionary;

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

    showListModal(data: { cntId: number, cntName: string, region?: Region }) {
        if (this.reportCategory) {
            this.eventShowListModal.emit({
                category: this.reportCategory,
                region: data.region,
                cntId: data.cntId,
                cntName: data.cntName
            });
        }
    }

}
