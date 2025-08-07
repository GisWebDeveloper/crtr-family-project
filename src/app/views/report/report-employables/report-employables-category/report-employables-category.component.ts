import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {ReportModalDescription} from "../../../../models/report/report-modal-description";
import {ReportEmployables} from "../../../../models/report/report-employables";
import {UtilService} from "../../../../services/util.service";
import {ReportService} from "../../../../services/report.service";
import {CountPageRequest} from "../../../../models/count/count-page-request";
import {Region} from "../../../../models/region";

@Component({
    selector: 'app-report-employables-category',
    templateUrl: './report-employables-category.component.html',
    styleUrls: ['./report-employables-category.component.scss']
})
export class ReportEmployablesCategoryComponent implements OnInit {

    //@Input() reportCategory: Dictionary | undefined;
    @Input() eventShowReport: EventEmitter<Dictionary>;
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<ReportModalDescription>();

    reportCategory: Dictionary;
    reportList: Array<ReportEmployables> = [];
    reportTotal: ReportEmployables = new ReportEmployables();

    constructor(
        public utilService: UtilService,
        public reportService: ReportService) {
    }

    ngOnInit(): void {
        //this.initReport();
        this.eventShowReport.subscribe(data => {
            this.reportCategory = data;
            this.initReport();
        });
    }

    initReport() {
        this.reportList = [];
        let request = new CountPageRequest();
        request.countCode = this.reportCategory.code;
        this.reportService.getReportEmployables(request).subscribe({
            next: response => {
                this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportEmployables>) {
        let total = new ReportEmployables();
        total.cnt1 = this.utilService.getArrayFieldSum(list, 'cnt1');
        total.cnt2 = this.utilService.getArrayFieldSum(list, 'cnt2');
        total.cnt3 = this.utilService.getArrayFieldSum(list, 'cnt3');
        total.cnt4 = this.utilService.getArrayFieldSum(list, 'cnt4');
        total.cnt5 = this.utilService.getArrayFieldSum(list, 'cnt5');
        total.cnt6 = this.utilService.getArrayFieldSum(list, 'cnt6');
        total.cnt7 = this.utilService.getArrayFieldSum(list, 'cnt7');
        this.reportTotal = total;
    }

    showListModal(region: Region, colId: number, translateKey: string) {
        let modalDescription = new ReportModalDescription();
        modalDescription.id = colId;
        modalDescription.countItem = this.reportCategory;
        modalDescription.region = region;
        modalDescription.description = this.utilService.getListDescription(region, translateKey);
        this.eventShowListModal.emit(modalDescription);
    }

    getFieldDescription(fieldKey: string): string {
        const translateKey = 'report-page.employables.'.concat(this.reportCategory.code.toLowerCase(), '.', fieldKey);
        return this.utilService.getTranslationValue(translateKey);
    }

}
