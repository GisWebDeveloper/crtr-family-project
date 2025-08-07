import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Region} from "../../../../models/region";
import {PersonDetailGeneral} from "../../../../models/person/person-detail-general";
import {Pagination} from "../../../../models/pagination";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";

@Component({
    selector: 'app-gov-rep-de-list-modal',
    templateUrl: './gov-rep-de-list-modal.component.html',
    styleUrls: ['./gov-rep-de-list-modal.component.scss']
})
export class GovRepDeListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<{
        nameId: number | undefined,
        date: string,
        region: Region | undefined,
        col: number,
        label: string
    }>;

    // 0. MODAL
    visible = false;
    params: {
        list: PersonDetailGeneral[],
        region?: Region,
        col: number,
        pagination: Pagination,
        download: boolean,
        label: string;
        nameId: number | undefined,
        date: string
    };

    constructor(
        private reportService: ReportService,
        public utilService: UtilService) {
        this.params = {
            list: [],
            col: 0,
            pagination: new Pagination(),
            download: true,
            label: '',
            nameId: undefined,
            date: ''
        }
    }

    ngOnInit(): void {
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.region = data.region;
            this.params.col = data.col;
            this.params.pagination.currentPage = 1;
            this.params.label = data.label;
            this.params.date = data.date;
            this.params.nameId = data.nameId
            this.initList();
        });
    }

    private initList() {
        let request = new ReportItemPageRequest();
        request.col = this.params.col;
        request.regionId = this.params.region?.id;
        request.nameId = this.params.nameId
        request.date = this.params.date;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.reportService.getReportGoDEPage(request).subscribe(
            {
                next: response => {
                    this.params.list = response.data ? response.data : [];
                    this.params.pagination.totalItems = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            }
        )
    }

    getTitle() {
        return this.params.label;
    }

    downloadList() {
        let request = new ReportItemPageRequest();
        request.col = this.params.col;
        if (this.params.region) {
            request.regionId = this.params.region?.id;
        }
        request.nameId = this.params.nameId
        request.date = this.params.date;
        this.reportService.downloadReportGoDEList(request, "report-go-de-list.xlsx");
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.initList();
    }

}
