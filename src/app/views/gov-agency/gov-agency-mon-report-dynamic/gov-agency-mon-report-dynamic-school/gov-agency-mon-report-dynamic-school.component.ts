import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {ReportDynamicMonSchool} from "../../../../models/report/report-dynamic-mon-school";
import {Dictionary} from "../../../../models/dictionary";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {Region} from "../../../../models/region";

@Component({
  selector: 'app-gov-agency-mon-report-dynamic-school',
  templateUrl: './gov-agency-mon-report-dynamic-school.component.html',
  styleUrls: ['./gov-agency-mon-report-dynamic-school.component.scss']
})
export class GovAgencyMonReportDynamicSchoolComponent implements OnInit {

    @Input() reportCategory: Dictionary;
    @Output() showList = new EventEmitter<{ cntId: number, cntName: string, region?: Region }>();

    reportList: Array<ReportDynamicMonSchool> = [];
    reportTotal: ReportDynamicMonSchool = new ReportDynamicMonSchool();
    listCntId: number[] = [];

    constructor(public utilService: UtilService,
                public reportService: ReportService) {
    }

    ngOnInit(): void {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportDynamicMonSchool(request).subscribe({
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

    calcTotals(list: Array<ReportDynamicMonSchool>) {
        let total = new ReportDynamicMonSchool();
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
        total.cnt21 = this.utilService.getArrayFieldSum(list, 'cnt21');
        total.cnt23 = this.utilService.getArrayFieldSum(list, 'cnt23');
        total.cnt25 = this.utilService.getArrayFieldSum(list, 'cnt25');
        total.cnt20 = total.cnt19 / total.cnt3 * 100;
        total.cnt22 = total.cnt21 / total.cnt3 * 100;

        this.reportTotal = total;
    }

    onShowListClick(cntId: number, region?: Region) {
        this.showList.emit({
            cntId: cntId,
            cntName: this.utilService.getTranslationValue('gov-agency-page.dynamic.mon.school.cnt-' + (cntId - 300)),
            region: region
        });
    }

    containsCntId(cntId: number): boolean {
        return this.listCntId.includes(cntId);
    }

}
