import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {ReportDynamicMonGarden} from "../../../../models/report/report-dynamic-mon-garden";
import {Dictionary} from "../../../../models/dictionary";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {Region} from "../../../../models/region";

@Component({
    selector: 'app-gov-agency-mon-report-dynamic-garden',
    templateUrl: './gov-agency-mon-report-dynamic-garden.component.html',
    styleUrls: ['./gov-agency-mon-report-dynamic-garden.component.scss']
})
export class GovAgencyMonReportDynamicGardenComponent implements OnInit {

    @Input() reportCategory: Dictionary;
    @Output() showList = new EventEmitter<{ cntId: number, cntName: string, region?: Region }>();

    reportList: Array<ReportDynamicMonGarden> = [];
    reportTotal: ReportDynamicMonGarden = new ReportDynamicMonGarden();
    listCntId: number[] = [];

    constructor(public utilService: UtilService,
                public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportDynamicMonGarden(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
        this.reportService.getReportDynamicCntIds(this.reportCategory.code).subscribe({
            next: response => {
                this.listCntId = response;
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportDynamicMonGarden>) {
        let total = new ReportDynamicMonGarden();
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
        total.cnt20 = this.utilService.getArrayFieldSum(list, 'cnt20');
        total.cntD = total.cnt20 / total.cnt3 * 100;
        this.reportTotal = total;
    }

    onShowListClick(cntId: number, region?: Region) {
        this.showList.emit({
            cntId: cntId,
            cntName: this.utilService.getTranslationValue('gov-agency-page.dynamic.mon.garden.cnt-' + (cntId - 300)),
            region: region
        });
    }

    containsCntId(cntId: number): boolean {
        return this.listCntId.includes(cntId);
    }
}
