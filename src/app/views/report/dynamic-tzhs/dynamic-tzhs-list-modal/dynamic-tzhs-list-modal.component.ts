import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {Region} from "../../../../models/region";
import {PersonDetailGeneral} from "../../../../models/person/person-detail-general";
import {Pagination} from "../../../../models/pagination";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";

@Component({
  selector: 'app-dynamic-tzhs-list-modal',
  templateUrl: './dynamic-tzhs-list-modal.component.html',
  styleUrls: ['./dynamic-tzhs-list-modal.component.scss']
})
export class DynamicTzhsListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<{
        region: Region,
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
    };

    constructor(
        private reportService: ReportService,
        public utilService: UtilService) {
        this.params = {
            list: [],
            col: 0,
            pagination: new Pagination(),
            download: true,
            label: ''
        }
    }

    ngOnInit(): void {
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.region = data.region;
            this.params.col = data.col;
            this.params.pagination.currentPage = 1;
            this.params.label = data.label
            this.initList();
        });
    }

    private initList() {
        let request = new ReportItemPageRequest();
        request.col = this.params.col;
        request.regionId = this.params.region?.id;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.reportService.getReportDynamicTzhsPage(request).subscribe(
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
        return this.params.region?.nameRu + ' / ' + this.params.label;
    }

    downloadList() {
        let request = new ReportItemPageRequest();
        request.col = this.params.col;
        request.regionId = this.params.region?.id;
        this.reportService.downloadReportDynamicTzhsList(request, "report-dynamic-tzhs-list.xlsx");
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
