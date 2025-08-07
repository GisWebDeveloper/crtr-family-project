import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {ReportMfIp} from "../../../../models/report/report-mf-ip";

@Component({
    selector: 'app-gov-agency-mf-report-ip',
    templateUrl: './gov-agency-mf-report-ip.component.html',
    styleUrls: ['./gov-agency-mf-report-ip.component.scss']
})
export class GovAgencyMfReportIpComponent implements OnInit {

    @Input() eventShowReportIP: EventEmitter<Dictionary>;

    dictionaryCount: Array<Dictionary> = [];
    reportCategory: Dictionary;
    reportList: Array<ReportMfIp> = [];
    reportTotal: ReportMfIp = new ReportMfIp();

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
        this.reportService.getReportMfIp(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportMfIp>) {
        let total = new ReportMfIp();
        total.cnt1 = this.utilService.getArrayFieldSum(list, 'cnt1');
        total.cnt2 = this.utilService.getArrayFieldSum(list, 'cnt2');
        total.cnt3 = this.utilService.getArrayFieldSum(list, 'cnt3');
        total.cnt4 = this.utilService.getArrayFieldSum(list, 'cnt4');
        total.cnt5 = this.utilService.getArrayFieldSum(list, 'cnt5');
        total.cnt6 = this.utilService.getArrayFieldSum(list, 'cnt6');
        total.cnt7 = this.utilService.getArrayFieldSum(list, 'cnt7');
        total.cnt8 = this.utilService.getArrayFieldSum(list, 'cnt8');
        total.cnt9 = this.utilService.getArrayFieldSum(list, 'cnt9');
        total.cnt10 = this.utilService.getArrayFieldSum(list, 'cnt10');
        total.total = this.utilService.getArrayFieldSum(list, 'total');
        total.totalAction = this.utilService.getArrayFieldSum(list, 'totalAction');
        this.reportTotal = total;
    }

}
