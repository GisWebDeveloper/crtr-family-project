import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportProactiveSmsCategory} from "../../../../models/report/report-ps-category";
import {Dictionary} from "../../../../models/dictionary";
import {ReportModalDescription} from "../../../../models/report/report-modal-description";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";
import {UserRoleService} from "../../../../services/user-role.service";
import {AuthService} from "../../../../services/auth.service";
import {Permissions} from "../../../../models/administration/permissions";

@Component({
    selector: 'app-report-ps-consolidated-by-category',
    templateUrl: './report-ps-consolidated-by-category.component.html',
    styleUrls: ['./report-ps-consolidated-by-category.component.scss']
})
export class ReportPsConsolidatedByCategoryComponent implements OnInit {

    @Input() currentYear: number;
    @Input() dictionaryYear: Array<number>;
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<ReportModalDescription>();
    @Output() eventShowListWithSmsModal: EventEmitter<any> = new EventEmitter<ReportModalDescription>();


    // 0. FILTER
    visible = [true];

    filter: {
        year: number
    }

    reportList: Array<ReportProactiveSmsCategory> = [];
    reportTotal: ReportProactiveSmsCategory = new ReportProactiveSmsCategory();
    permissions = Permissions.PERMISSIONS;

    constructor(
        public reportService: ReportService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.filter = {year: this.currentYear}
        this.initReport();
    }

    private initReport() {
        let request = new ReportItemPageRequest();
        request.type = 'CONSOLIDATED_CATEGORY';
        request.year = this.filter.year;
        this.reportService.getProactiveSmsCategoryReport(request).subscribe({
            next: response => {
                if (response) this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    private calcTotals(list: Array<ReportProactiveSmsCategory>) {
        let total = new ReportProactiveSmsCategory();
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
        total.pers1 = this.utilService.getArrayFieldSum(list, 'pers1');
        total.pers2 = this.utilService.getArrayFieldSum(list, 'pers2');

        total.pers1 = total.pers1 / list.length;
        total.pers2 = total.pers2 / list.length;

        this.reportTotal = total;
    }

    showListModal(dictionary: Dictionary, colId: number, translateKey: string) {
        let modalDescription = new ReportModalDescription();
        modalDescription.id = colId;
        modalDescription.countItem = dictionary;
        modalDescription.year = this.filter.year;
        modalDescription.description = this.getListDescription(dictionary, translateKey);
        if (dictionary.code === 'S7004') {
            this.eventShowListWithSmsModal.emit(modalDescription);
        } else {
            this.eventShowListModal.emit(modalDescription);
        }
    }

    private getListDescription(dictionary: Dictionary, translateKey: string): string {
        let descArray = [];
        descArray.push(this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu));
        descArray.push(this.utilService.getTranslationValue(translateKey));
        return descArray.filter(Boolean).join(' / ');
    }

    search() {
        this.initReport();
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
