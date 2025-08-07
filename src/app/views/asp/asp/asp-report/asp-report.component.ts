import {Component, OnInit} from '@angular/core';
import {AspReport} from "../../../../models/asp/asp-report";
import {AspService} from "../../../../services/asp.service";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";

@Component({
    selector: 'app-asp-report',
    templateUrl: './asp-report.component.html',
    styleUrls: ['./asp-report.component.scss']
})
export class AspReportComponent implements OnInit {

    public aspReportList: Array<AspReport>= [];
    reportTotal: AspReport = new AspReport();

    constructor(private aspService: AspService,
                public utilService: UtilService,
                public reportService: ReportService) {
        this.aspReportList = new Array<AspReport>();
    }

    ngOnInit(): void {
        this.aspService.getAspInfo().subscribe( {
            next: response => {
                this.aspReportList =response;
                this.calcTotals(this.aspReportList);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    public exportTableToExcel(id:string){

    }

    calcTotals(list: Array<AspReport>) {
        let total = new AspReport();
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
        total.cnt20 = this.utilService.getArrayFieldSum(list, 'cnt20');

        total.cnt21 = this.utilService.getArrayFieldSum(list, 'cnt21');
        total.cnt22 = this.utilService.getArrayFieldSum(list, 'cnt22');
        total.cnt23 = this.utilService.getArrayFieldSum(list, 'cnt23');
        total.cnt24 = this.utilService.getArrayFieldSum(list, 'cnt24');
        total.cnt25 = total.cnt24 / total.cnt21 * 100;
        total.cnt26 = this.utilService.getArrayFieldSum(list, 'cnt26');
        total.cnt27 = this.utilService.getArrayFieldSum(list, 'cnt27');
        total.cnt28 = this.utilService.getArrayFieldSum(list, 'cnt28');
        total.cnt29 = this.utilService.getArrayFieldSum(list, 'cnt29');
        total.cnt30 = this.utilService.getArrayFieldSum(list, 'cnt30');

        total.cnt31 = this.utilService.getArrayFieldSum(list, 'cnt31');
        total.cnt32 = this.utilService.getArrayFieldSum(list, 'cnt32');
        total.cnt33 = this.utilService.getArrayFieldSum(list, 'cnt33');
        total.cnt34 = this.utilService.getArrayFieldSum(list, 'cnt34');
        total.cnt35 = this.utilService.getArrayFieldSum(list, 'cnt35');
        total.cnt36 = this.utilService.getArrayFieldSum(list, 'cnt36');
        total.cnt37 = this.utilService.getArrayFieldSum(list, 'cnt37');
        total.cnt38 = this.utilService.getArrayFieldSum(list, 'cnt38');
        total.cnt39 = this.utilService.getArrayFieldSum(list, 'cnt39');
        total.cnt40 = this.utilService.getArrayFieldSum(list, 'cnt40');

        total.cnt41 = this.utilService.getArrayFieldSum(list, 'cnt41');
        total.cnt42 = this.utilService.getArrayFieldSum(list, 'cnt42');
        total.cnt43 = this.utilService.getArrayFieldSum(list, 'cnt43');
        total.cnt44 = this.utilService.getArrayFieldSum(list, 'cnt44');
        total.cnt45 = total.cnt44 / total.cnt43 * 100;
        total.cnt46 = this.utilService.getArrayFieldSum(list, 'cnt46');
        total.cnt47 = this.utilService.getArrayFieldSum(list, 'cnt47');
        total.cnt48 = this.utilService.getArrayFieldSum(list, 'cnt48');
        total.cnt49 = this.utilService.getArrayFieldSum(list, 'cnt49');
        total.cnt50 = this.utilService.getArrayFieldSum(list, 'cnt50');

        total.cnt51 = this.utilService.getArrayFieldSum(list, 'cnt51');
        total.cnt52 = this.utilService.getArrayFieldSum(list, 'cnt52');
        total.cnt53 = this.utilService.getArrayFieldSum(list, 'cnt53');
        total.cnt54 = this.utilService.getArrayFieldSum(list, 'cnt54');
        total.cnt55 = this.utilService.getArrayFieldSum(list, 'cnt55');
        total.cnt56 = this.utilService.getArrayFieldSum(list, 'cnt56');
        total.cnt57 = this.utilService.getArrayFieldSum(list, 'cnt57');
        total.cnt58 = this.utilService.getArrayFieldSum(list, 'cnt58');
        total.cnt59 = this.utilService.getArrayFieldSum(list, 'cnt59');
        total.cnt60 = this.utilService.getArrayFieldSum(list, 'cnt60');

        this.reportTotal = total;
    }

}
