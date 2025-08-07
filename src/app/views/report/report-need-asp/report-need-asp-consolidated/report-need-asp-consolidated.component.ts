import {Component, OnInit} from '@angular/core';
import {ReportNeedActionsCategory} from "../../../../models/report/report-na-category";
import {ReportService} from "../../../../services/report.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../../services/util.service";
import {NeedJournalRequest} from "../../../../models/monitoring/need-journal-request";

@Component({
    selector: 'app-report-need-asp-consolidated',
    templateUrl: './report-need-asp-consolidated.component.html',
    styleUrls: ['./report-need-asp-consolidated.component.scss']
})
export class ReportNeedAspConsolidatedComponent implements OnInit {

    categoryListASP: Array<ReportNeedActionsCategory> = [];
    categoryTotalASP: ReportNeedActionsCategory = new ReportNeedActionsCategory();

    constructor(
        public reportService: ReportService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.initReportCategory();
    }

    initReportCategory() {
        let request = new NeedJournalRequest();
        request.type = 'CONSOLIDATED_ASP';
        this.reportService.getNeedActionsCategoryReport(request).subscribe({
            next: response => {
                if (response) {
                    this.categoryListASP = response.filter(item => ['S0501', 'S0502'].includes(item.category.code));
                }
                this.calcCategoryTotals();
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcCategoryTotals() {
        this.categoryListASP.forEach(item => {
            this.categoryTotalASP.total = (this.categoryTotalASP.total || 0) + (item.total || 0);
            this.categoryTotalASP.processed = (this.categoryTotalASP.processed || 0) + (item.processed || 0);
            this.categoryTotalASP.processedPercentage = (this.categoryTotalASP.processedPercentage || 0) + (item.processedPercentage || 0);
            this.categoryTotalASP.y = (this.categoryTotalASP.y || 0) + (item.y || 0);
            this.categoryTotalASP.y100 = (this.categoryTotalASP.y100 || 0) + (item.y100 || 0);
            this.categoryTotalASP.y200 = (this.categoryTotalASP.y200 || 0) + (item.y200 || 0);
            this.categoryTotalASP.y300 = (this.categoryTotalASP.y300 || 0) + (item.y300 || 0);
            this.categoryTotalASP.y400 = (this.categoryTotalASP.y400 || 0) + (item.y400 || 0);
            this.categoryTotalASP.n = (this.categoryTotalASP.n || 0) + (item.n || 0);
            this.categoryTotalASP.n100 = (this.categoryTotalASP.n100 || 0) + (item.n100 || 0);
            this.categoryTotalASP.n200 = (this.categoryTotalASP.n200 || 0) + (item.n200 || 0);
            this.categoryTotalASP.n300 = (this.categoryTotalASP.n300 || 0) + (item.n300 || 0);
            this.categoryTotalASP.n400 = (this.categoryTotalASP.n400 || 0) + (item.n400 || 0);
            this.categoryTotalASP.n500 = (this.categoryTotalASP.n500 || 0) + (item.n500 || 0);
            this.categoryTotalASP.notProcessed = (this.categoryTotalASP.notProcessed || 0) + (item.notProcessed || 0);
        });
        this.categoryTotalASP.processedPercentage = this.categoryTotalASP.processedPercentage / this.categoryListASP.length;
    }

    getTranslateKey(key: string, isAsp: boolean): string {
        let value = isAsp ? key + '-asp' : key;
        return 'report-page.need-actions.' + value;
    }

}
