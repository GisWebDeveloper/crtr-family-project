import {Component, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {ReportNeedActionsRegion} from "../../../../models/report/report-na-region";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {NeedJournalRequest} from "../../../../models/monitoring/need-journal-request";

@Component({
    selector: 'app-report-need-asp-by-region',
    templateUrl: './report-need-asp-by-region.component.html',
    styleUrls: ['./report-need-asp-by-region.component.scss']
})
export class ReportNeedAspByRegionComponent implements OnInit {

    @Input() dictionaryCount: Array<Dictionary>;

    // 0. FILTER // 1. REPORT
    visible = [true, true];

    reportList: Array<ReportNeedActionsRegion> = [];
    reportTotal: ReportNeedActionsRegion = new ReportNeedActionsRegion();
    params: {
        countCode: string,
        countDictionary: Dictionary | undefined
    }

    constructor(
        public reportService: ReportService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            countCode: '',
            countDictionary: undefined
        }
        this.initReportASP();
    }

    initReportASP() {
        let request = new NeedJournalRequest();
        request.type = 'REGION_ASP';
        this.reportService.getNeedActionsReport(request).subscribe({
            next: response => {
                if (response) this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportNeedActionsRegion>) {
        let total = new ReportNeedActionsRegion();
        list.forEach(item => {
            total.total = (total.total || 0) + (item.total || 0);
            total.processed = (total.processed || 0) + (item.processed || 0);
            total.processedPercentage = (total.processedPercentage || 0) + (item.processedPercentage || 0);
            total.y = (total.y || 0) + (item.y || 0);
            total.y100 = (total.y100 || 0) + (item.y100 || 0);
            total.y200 = (total.y200 || 0) + (item.y200 || 0);
            total.y300 = (total.y300 || 0) + (item.y300 || 0);
            total.y400 = (total.y400 || 0) + (item.y400 || 0);
            total.n = (total.n || 0) + (item.n || 0);
            total.n100 = (total.n100 || 0) + (item.n100 || 0);
            total.n200 = (total.n200 || 0) + (item.n200 || 0);
            total.n300 = (total.n300 || 0) + (item.n300 || 0);
            total.n400 = (total.n400 || 0) + (item.n400 || 0);
            total.n500 = (total.n500 || 0) + (item.n500 || 0);
            total.notProcessed = (total.notProcessed || 0) + (item.notProcessed || 0);
        });
        total.processedPercentage = total.processedPercentage / list.length;
        this.reportTotal = total;
    }

    search() {
        if (this.params.countDictionary) {
            this.reportList = [];
            let request = new NeedJournalRequest();
            request.type = 'REGION_ASP';
            request.countCode = this.params.countDictionary.code;
            this.reportService.getNeedActionsReport(request).subscribe({
                next: response => {
                    this.reportList = response;
                    this.calcTotals(this.reportList);
                }, error: reportError => {
                    this.utilService.displayError(reportError);
                }
            });
        } else {
            this.utilService.notifyError('Выберите меру');
        }
    }

    getTranslateKey(key: string, isAsp?: boolean): string {
        let value = key;
        if (isAsp || (this.params.countDictionary && ['S0501', 'S0502'].includes(this.params.countDictionary.code))) {
            value = key + '-asp';
        }
        return 'report-page.need-actions.' + value;
    }

}
