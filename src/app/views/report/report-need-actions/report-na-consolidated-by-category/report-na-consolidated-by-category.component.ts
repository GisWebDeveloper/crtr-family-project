import {Component, OnInit} from '@angular/core';
import {ReportNeedActionsCategory} from "../../../../models/report/report-na-category";
import {ReportService} from "../../../../services/report.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../../services/util.service";
import {NeedJournalRequest} from "../../../../models/monitoring/need-journal-request";

@Component({
    selector: 'app-report-na-consolidated-by-category',
    templateUrl: './report-na-consolidated-by-category.component.html',
    styleUrls: ['./report-na-consolidated-by-category.component.scss']
})
export class ReportNaConsolidatedByCategoryComponent implements OnInit {

    categoryListBenefit: Array<ReportNeedActionsCategory> = [];
    categoryTotalBenefit: ReportNeedActionsCategory = new ReportNeedActionsCategory();

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
        request.type = 'CONSOLIDATED_BENEFIT';
        this.reportService.getNeedActionsCategoryReport(request).subscribe({
            next: response => {
                if (response) {
                    this.categoryListBenefit = response.filter(item => !['S0501', 'S0502'].includes(item.category.code));
                }
                this.calcCategoryTotals();
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcCategoryTotals() {
        this.categoryListBenefit.forEach(item => {
            this.categoryTotalBenefit.total = (this.categoryTotalBenefit.total || 0) + (item.total || 0);
            this.categoryTotalBenefit.processed = (this.categoryTotalBenefit.processed || 0) + (item.processed || 0);
            this.categoryTotalBenefit.processedPercentage = (this.categoryTotalBenefit.processedPercentage || 0) + (item.processedPercentage || 0);
            this.categoryTotalBenefit.y = (this.categoryTotalBenefit.y || 0) + (item.y || 0);
            this.categoryTotalBenefit.y100 = (this.categoryTotalBenefit.y100 || 0) + (item.y100 || 0);
            this.categoryTotalBenefit.y200 = (this.categoryTotalBenefit.y200 || 0) + (item.y200 || 0);
            this.categoryTotalBenefit.y300 = (this.categoryTotalBenefit.y300 || 0) + (item.y300 || 0);
            this.categoryTotalBenefit.y400 = (this.categoryTotalBenefit.y400 || 0) + (item.y400 || 0);
            this.categoryTotalBenefit.n = (this.categoryTotalBenefit.n || 0) + (item.n || 0);
            this.categoryTotalBenefit.n100 = (this.categoryTotalBenefit.n100 || 0) + (item.n100 || 0);
            this.categoryTotalBenefit.n200 = (this.categoryTotalBenefit.n200 || 0) + (item.n200 || 0);
            this.categoryTotalBenefit.n300 = (this.categoryTotalBenefit.n300 || 0) + (item.n300 || 0);
            this.categoryTotalBenefit.n400 = (this.categoryTotalBenefit.n400 || 0) + (item.n400 || 0);
            this.categoryTotalBenefit.n500 = (this.categoryTotalBenefit.n500 || 0) + (item.n500 || 0);
            this.categoryTotalBenefit.notProcessed = (this.categoryTotalBenefit.notProcessed || 0) + (item.notProcessed || 0);
        });
        this.categoryTotalBenefit.processedPercentage = this.categoryTotalBenefit.processedPercentage / this.categoryListBenefit.length;
    }

    getTranslateKey(key: string, isAsp: boolean): string {
        let value = isAsp ? key + '-asp' : key;
        return 'report-page.need-actions.' + value;
    }
}
