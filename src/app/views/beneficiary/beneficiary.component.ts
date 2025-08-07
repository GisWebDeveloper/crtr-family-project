import {Component, OnInit} from '@angular/core';
import {BeneficiaryService} from "../../services/beneficiary.service";
import {UtilService} from "../../services/util.service";
import {BeneficiaryStat} from "../../models/beneficiary/beneficiary-stat";
import {Pagination} from "../../models/pagination";
import {ReportService} from "../../services/report.service";

@Component({
    selector: 'app-beneficiary',
    templateUrl: './beneficiary.component.html',
    styleUrls: ['./beneficiary.component.scss']
})
export class BeneficiaryComponent implements OnInit {

    visible = [true];

    params: {
        beneficiaryStat: BeneficiaryStat | undefined,
        list: Array<any>,
        pagination: Pagination
    }

    countStatList: BeneficiaryStat[] = [];

    constructor(private beneficiaryService: BeneficiaryService,
                public utilService: UtilService,
                private reportService: ReportService) {
        this.params = {
            beneficiaryStat: undefined,
            list: new Array<any>(),
            pagination: new Pagination()
        }
    }

    ngOnInit(): void {
        this.initCountStatList();
    }

    initCountStatList() {
        this.beneficiaryService.getStat().subscribe({
            next: response => {
                this.countStatList = response;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    searchCountStat() {

    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }


    selectCountItem(item: BeneficiaryStat | undefined) {
        const isSameCount = item && this.params.beneficiaryStat && this.params.beneficiaryStat.code === item.code;
        if (!isSameCount) {
            this.params.pagination.currentPage = 1;
        }
        let filterRequest = {
            code: item ? item.code : undefined,
            page: this.params.pagination.currentPage,
            size: this.params.pagination.itemsPerPage
        }
        this.params.beneficiaryStat = item;
        this.beneficiaryService.getPage(filterRequest).subscribe({
            next: response => {
                this.params.list = response.data;
                this.params.pagination.totalItems = response.total;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    downloadReport() {
        let requestParams: any = {
            code: this.params.beneficiaryStat?.code
        };

        this.reportService.downloadBeneficiaryListUrl(requestParams, "list.xlsx");
    }

    changePage(page: any) {
        this.params.pagination.currentPage = page;
        this.selectCountItem(this.params.beneficiaryStat)
    }
}
