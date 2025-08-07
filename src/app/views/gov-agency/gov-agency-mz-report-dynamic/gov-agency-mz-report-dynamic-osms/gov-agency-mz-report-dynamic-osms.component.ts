import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DictionaryService} from "../../../../services/dictionary.service";
import {UtilService} from "../../../../services/util.service";
import {GovAgencyService} from "../../../../services/gov-agency.service";
import {Dictionary} from "../../../../models/dictionary";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {ReportService} from "../../../../services/report.service";
import {ReportDynamicMzOsms} from "../../../../models/report/report-dynamic-mz-osms";
import {Region} from "../../../../models/region";

@Component({
    selector: 'app-gov-agency-mz-report-dynamic-osms',
    templateUrl: './gov-agency-mz-report-dynamic-osms.component.html',
    styleUrls: ['./gov-agency-mz-report-dynamic-osms.component.scss']
})
export class GovAgencyMzReportDynamicOsmsComponent implements OnInit {

    @Output() eventShowListModal = new EventEmitter<{
        category: Dictionary,
        region?: Region,
        cntId: number,
        cntName: string
    }>();

    reportCategory: Dictionary;
    reportList: Array<ReportDynamicMzOsms> = [];
    reportTotal: ReportDynamicMzOsms = new ReportDynamicMzOsms();
    listCntId: number[] = [];

    constructor(private dictionaryService: DictionaryService,
                public utilService: UtilService,
                public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MZ_LIST_OSMS_CODE).subscribe({
            next: response => {
                if (response && response.length > 0) {
                    this.reportCategory = response[0];
                    this.initReport();
                }
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    initReport() {
        this.reportService.getReportDynamicCntIds(this.reportCategory.code).subscribe({
            next: response => {
                this.listCntId = response;
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportDynamicMzOsms(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportDynamicMzOsms>) {
        let total = new ReportDynamicMzOsms();
        total.cnt3 = this.utilService.getArrayFieldSum(list, 'cnt3');
        total.cnt4 = this.utilService.getArrayFieldSum(list, 'cnt4');
        total.cnt5 = this.utilService.getArrayFieldSum(list, 'cnt5');
        total.cnt6 = this.utilService.getArrayFieldSum(list, 'cnt6');
        total.cnt7 = this.utilService.getArrayFieldSum(list, 'cnt7');
        total.cnt8 = this.utilService.getArrayFieldSum(list, 'cnt8');
        total.cnt9 = this.utilService.getArrayFieldSum(list, 'cnt9');
        total.cnt10 = this.utilService.getArrayFieldSum(list, 'cnt10');
        total.cnt11 = this.utilService.getArrayFieldSum(list, 'cnt11');
        total.cnt12 = this.utilService.getArrayFieldSum(list, 'cnt12');
        total.cnt13 = this.utilService.getArrayFieldSum(list, 'cnt13');
        total.cnt14 = this.utilService.getArrayFieldSum(list, 'cnt14');
        total.cnt15 = this.utilService.getArrayFieldSum(list, 'cnt15');
        total.cnt16 = this.utilService.getArrayFieldSum(list, 'cnt16');
        total.cnt17 = this.utilService.getArrayFieldSum(list, 'cnt17');
        total.cnt18 = this.utilService.getArrayFieldSum(list, 'cnt18');
        total.cnt19 = this.utilService.getArrayFieldSum(list, 'cnt19');
        total.cnt20 = this.utilService.getArrayFieldSum(list, 'cnt20');
        total.cnt22 = this.utilService.getArrayFieldSum(list, 'cnt22');
        total.cnt23 = this.utilService.getArrayFieldSum(list, 'cnt23');
        total.cnt24 = this.utilService.getArrayFieldSum(list, 'cnt24');
        total.cnt25 = this.utilService.getArrayFieldSum(list, 'cnt25');
        total.cnt26 = total.cnt4 / total.cnt3 * 100;
        this.reportTotal = total;
    }

    showListModal(cntId: number, region?: Region) {
        if (this.reportCategory) {
            this.eventShowListModal.emit({
                category: this.reportCategory,
                region: region,
                cntId: cntId,
                cntName: this.utilService.getTranslationValue('gov-agency-page.dynamic.mz.osms.cnt-' + (cntId - 300))
            });
        }
    }

    containsCntId(cntId: number): boolean {
        return this.listCntId.includes(cntId);
    }

}
