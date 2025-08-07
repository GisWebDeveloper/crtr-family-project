import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportProactiveSmsRegion} from "../../../../models/report/report-ps-region";
import {Region} from "../../../../models/region";
import {ReportModalDescription} from "../../../../models/report/report-modal-description";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";
import {UserRoleService} from "../../../../services/user-role.service";
import {AuthService} from "../../../../services/auth.service";
import {Permissions} from "../../../../models/administration/permissions";

@Component({
    selector: 'app-report-ps-by-filter',
    templateUrl: './report-ps-by-filter.component.html',
    styleUrls: ['./report-ps-by-filter.component.scss']
})
export class ReportPsByFilterComponent implements OnInit {

    @Input() currentYear: number;
    @Input() dictionaryYear: Array<number>;
    @Input() dictionaryCount: Array<Dictionary>;
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<ReportModalDescription>();

    // 0. FILTER // 1. REPORT
    visible = [true, true];

    reportList: Array<ReportProactiveSmsRegion> = [];
    reportTotal: ReportProactiveSmsRegion = new ReportProactiveSmsRegion();
    filter: {
        countCode: string,
        countDictionary: Dictionary | undefined
        year: number
    }
    permissions = Permissions.PERMISSIONS;

    constructor(
        public reportService: ReportService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.filter = {
            countCode: '',
            countDictionary: undefined,
            year: this.currentYear
        }
        this.initReportBenefit();
    }

    search() {
        if (this.filter.countDictionary) {
            this.reportList = [];
            let request = new ReportItemPageRequest();
            request.type = 'BY COUNT';
            request.countCode = this.filter.countDictionary.code;
            request.year = this.filter.year;
            this.reportService.getProactiveSmsRegionReport(request).subscribe({
                next: response => {
                    this.reportList = response;
                    this.calcTotals(this.reportList);
                }, error: reportError => {
                    this.utilService.displayError(reportError);
                }
            });
        } else {
            this.utilService.notifyError('Выберите меру');
        }
    }

    initReportBenefit() {
        let request = new ReportItemPageRequest();
        request.type = 'CONSOLIDATED_REGION';
        request.year = this.filter.year;
        this.reportService.getProactiveSmsRegionReport(request).subscribe({
            next: response => {
                if (response) this.reportList = response;
                this.calcTotals(this.reportList);
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    calcTotals(list: Array<ReportProactiveSmsRegion>) {
        let total = new ReportProactiveSmsRegion();
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

    showListModal(region: Region, colId: number, translateKey: string) {
        let modalDescription = new ReportModalDescription();
        modalDescription.id = colId;
        modalDescription.region = region;
        modalDescription.year = this.filter.year;
        modalDescription.description = this.getListDescription(region, translateKey);
        if (this.filter.countDictionary) modalDescription.countItem = this.filter.countDictionary;
        this.eventShowListModal.emit(modalDescription);
    }

    private getListDescription(dictionary: Dictionary | Region, translateKey: string): string {
        let descArray = [];
        descArray.push(this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu));
        descArray.push(this.utilService.getTranslationValue(translateKey));
        return descArray.filter(Boolean).join(' / ');
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
