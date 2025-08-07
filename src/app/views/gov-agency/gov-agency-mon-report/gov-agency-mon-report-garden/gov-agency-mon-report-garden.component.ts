import {Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {ReportMonGarden} from "../../../../models/report/report-mon-garden";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";

@Component({
    selector: 'app-gov-agency-mon-report-garden',
    templateUrl: './gov-agency-mon-report-garden.component.html',
    styleUrls: ['./gov-agency-mon-report-garden.component.scss']
})
export class GovAgencyMonReportGardenComponent implements OnInit {

    @Input() reportCategory: Dictionary;

    reportList: Array<ReportMonGarden> = [];
    reportTotal: ReportMonGarden = new ReportMonGarden();

    constructor(
        public utilService: UtilService,
        public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportMonGarden(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportMonGarden>) {
        let total = new ReportMonGarden();
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
        total.total = this.utilService.getArrayFieldSum(list, 'total');
        total.totalAction = this.utilService.getArrayFieldSum(list, 'totalAction');
        this.reportTotal = total;
    }

}
