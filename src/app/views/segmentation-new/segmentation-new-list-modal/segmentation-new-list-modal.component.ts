import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Pagination} from "../../../models/pagination";
import {UtilService} from "../../../services/util.service";
import {SegmentationNewFilter} from "../../../models/segmentation/segmentation-new-filter";
import {SegmentationService} from "../../../services/segmentation.service";
import {SegmentationListItem} from "../../../models/segmentation/segmentation-list-item";
import {SegmentationStatItem} from "../../../models/segmentation/segmentation-stat-item";
import {ReportService} from "../../../services/report.service";

@Component({
    selector: 'app-segmentation-new-list-modal',
    templateUrl: './segmentation-new-list-modal.component.html',
    styleUrls: ['./segmentation-new-list-modal.component.scss']
})
export class SegmentationNewListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;
    params: {
        list: Array<SegmentationListItem>,
        segmentationFilter: any,
        pagination: Pagination,
        download: boolean
    }

    constructor(
        private segmentationService: SegmentationService,
        public utilService: UtilService,
        private reportService: ReportService) {
    }

    ngOnInit(): void {
        this.params = {
            list: [],
            segmentationFilter: new SegmentationNewFilter(),
            pagination: new Pagination(),
            download: true
        }
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.segmentationFilter = data;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        this.params.segmentationFilter.page = this.params.pagination.currentPage;
        this.params.segmentationFilter.size = this.params.pagination.itemsPerPage;
        this.segmentationService.getSegmentationPageNew(this.params.segmentationFilter).subscribe({
            next: response => {
                this.params.list = response.familyDetailList ? response.familyDetailList : [];
                this.params.pagination.totalItems = response.total;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

    }

    downloadList() {
        this.reportService.downloadSegmentationList(this.params.segmentationFilter, "person-list.xlsx");
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
