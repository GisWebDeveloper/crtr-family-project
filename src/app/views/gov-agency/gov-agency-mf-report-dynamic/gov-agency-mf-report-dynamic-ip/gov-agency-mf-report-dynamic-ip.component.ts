import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {Region} from "../../../../models/region";
import {DictionaryService} from "../../../../services/dictionary.service";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {GovAgencyService} from "../../../../services/gov-agency.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {ReportDynamicMfIp} from "../../../../models/report/report-dynamic-mf-ip";

@Component({
    selector: 'app-gov-agency-mf-report-dynamic-ip',
    templateUrl: './gov-agency-mf-report-dynamic-ip.component.html',
    styleUrls: ['./gov-agency-mf-report-dynamic-ip.component.scss']
})
export class GovAgencyMfReportDynamicIpComponent implements OnInit {

    @Output() eventShowListModal = new EventEmitter<{
        category: Dictionary,
        region?: Region,
        cntId: number,
        cntName: string
    }>();

    reportCategory: Dictionary;
    reportList: Array<ReportDynamicMfIp> = [];
    reportTotal: ReportDynamicMfIp = new ReportDynamicMfIp();
    listCntId: number[] = [];

    constructor(
        private dictionaryService: DictionaryService,
        public utilService: UtilService,
        public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MF_LIST_IP_CODE).subscribe({
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
        this.reportService.getReportDynamicMfIp(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportDynamicMfIp>) {
        let total = new ReportDynamicMfIp();
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
        total.cnt15 = total.cnt14 / total.cnt3 * 100;
        this.reportTotal = total;
    }

    showListModal(cntId: number, region?: Region) {
        if (this.reportCategory) {
            this.eventShowListModal.emit({
                category: this.reportCategory,
                region: region,
                cntId: cntId,
                cntName: this.utilService.getTranslationValue('gov-agency-page.dynamic.mf.ip.cnt-' + (cntId - 300))
            });
        }
    }

    containsCntId(cntId: number): boolean {
        return this.listCntId.includes(cntId);
    }

}
