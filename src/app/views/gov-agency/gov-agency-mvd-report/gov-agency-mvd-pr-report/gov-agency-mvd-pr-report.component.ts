import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {ReportMvd} from "../../../../models/report/report-mvd";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";

@Component({
  selector: 'app-gov-agency-mvd-pr-report',
  templateUrl: './gov-agency-mvd-pr-report.component.html',
  styleUrls: ['./gov-agency-mvd-pr-report.component.scss']
})
export class GovAgencyMvdPrReportComponent implements OnInit {


    @Input() eventShowReportIP: EventEmitter<Dictionary>;

    dictionaryCount: Array<Dictionary> = [];
    reportCategory: Dictionary;
    reportList: Array<ReportMvd> = [];
    reportTotal: ReportMvd = new ReportMvd();

    constructor(
        public utilService: UtilService,
        public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.eventShowReportIP.subscribe(data => {
            this.reportCategory = data;
            this.initReport();
        });
    }

    initReport() {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportMvd(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportMvd>) {
        let total = new ReportMvd();
        total.checked = this.utilService.getArrayFieldSum(list, 'checked');
        total.unchecked = this.utilService.getArrayFieldSum(list, 'unchecked');

        total.total = this.utilService.getArrayFieldSum(list, 'total');
        total.totalAction = this.utilService.getArrayFieldSum(list, 'totalAction');
        this.reportTotal = total;
    }
}
