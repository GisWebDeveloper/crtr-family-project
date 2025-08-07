import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {ReportMiorNeet} from "../../../../models/report/report-mior-neet";

@Component({
    selector: 'app-gov-agency-mior-report-neet',
    templateUrl: './gov-agency-mior-report-neet.component.html',
    styleUrls: ['./gov-agency-mior-report-neet.component.scss']
})
export class GovAgencyMiorReportNeetComponent implements OnInit {

    @Input() eventShowReportNEET: EventEmitter<Dictionary>;

    dictionaryCount: Array<Dictionary> = [];
    reportCategory: Dictionary;
    reportList: Array<ReportMiorNeet> = [];
    reportTotal: ReportMiorNeet = new ReportMiorNeet();

    constructor(
        public utilService: UtilService,
        public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.eventShowReportNEET.subscribe(data => {
            this.reportCategory = data;
            this.initReport();
        });
    }

    initReport() {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportMiorNeet(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportMiorNeet>) {
        let total = new ReportMiorNeet();
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
        total.cnt11 = this.utilService.getArrayFieldSum(list, 'cnt11');
        total.cnt12 = this.utilService.getArrayFieldSum(list, 'cnt12');
        total.cnt13 = this.utilService.getArrayFieldSum(list, 'cnt13');
        total.cnt14 = this.utilService.getArrayFieldSum(list, 'cnt14');
        total.cnt15 = this.utilService.getArrayFieldSum(list, 'cnt15');
        total.cnt16 = this.utilService.getArrayFieldSum(list, 'cnt16');
        total.cnt17 = this.utilService.getArrayFieldSum(list, 'cnt17');
        total.cnt18 = this.utilService.getArrayFieldSum(list, 'cnt18');
        total.cnt19 = this.utilService.getArrayFieldSum(list, 'cnt19');
        total.total = this.utilService.getArrayFieldSum(list, 'total');
        total.totalAction = this.utilService.getArrayFieldSum(list, 'totalAction');
        this.reportTotal = total;
    }

}
