import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {Region} from "../../../../models/region";
import {PersonDetailGeneral} from "../../../../models/person/person-detail-general";
import {Pagination} from "../../../../models/pagination";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportDynamicPageRequest} from "../../../../models/report/report-dynamic-page-request";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";

@Component({
  selector: 'app-report-rating-list-modal',
  templateUrl: './report-rating-list-modal.component.html',
  styleUrls: ['./report-rating-list-modal.component.scss']
})
export class ReportRatingListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<{
        category: Dictionary,
        region: Region,
    }>;

    // 0. MODAL
    visible = false;
    params: {
        list: PersonDetailGeneral[],
        reportCategory: Dictionary,
        region: Region,
        pagination: Pagination,
        download: boolean
    };

    constructor(
        private reportService: ReportService,
        public utilService: UtilService) {
        this.params = {
            list: [],
            reportCategory: new Dictionary(0, '', '', ''),
            region: new Region(),
            pagination: new Pagination(),
            download: true
        }
    }

    ngOnInit(): void {
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.reportCategory = data.category;
            this.params.region = data.region;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        let request = new ReportItemPageRequest();
        request.countCode = this.params.reportCategory.code;
        request.regionId = this.params.region.id;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.reportService.getReportRegionRatingPage(request).subscribe(
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
        return this.params.reportCategory.nameRu + ' / ' + this.params.region?.nameRu;
    }

    downloadList() {
        let request = new ReportItemPageRequest();
        request.countCode = this.params.reportCategory.code;
        request.regionId = this.params.region?.id;
        this.reportService.downloadRegionRatingList(request, "report-region-rating-list.xlsx");
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
