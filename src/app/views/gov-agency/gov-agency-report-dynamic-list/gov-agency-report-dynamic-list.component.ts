import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Pagination} from "../../../models/pagination";
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {ReportService} from "../../../services/report.service";
import {ReportDynamicPageRequest} from "../../../models/report/report-dynamic-page-request";
import {PersonDetailGeneral} from "../../../models/person/person-detail-general";
import {Region} from "../../../models/region";

@Component({
    selector: 'app-gov-agency-report-dynamic-list',
    templateUrl: './gov-agency-report-dynamic-list.component.html',
    styleUrls: ['./gov-agency-report-dynamic-list.component.scss']
})
export class GovAgencyReportDynamicListComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<{
        category: Dictionary,
        region?: Region,
        cntId: number,
        cntName: string
    }>;

    // 0. MODAL
    visible = false;
    params: {
        list: PersonDetailGeneral[],
        reportCategory: Dictionary,
        region?: Region,
        cntId: number,
        cntName: string
        pagination: Pagination,
        download: boolean
    };

    constructor(
        private reportService: ReportService,
        public utilService: UtilService) {
        this.params = {
            list: [],
            reportCategory: new Dictionary(0, '', '', ''),
            cntId: 0,
            cntName: '',
            pagination: new Pagination(),
            download: true
        }
    }

    ngOnInit(): void {
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.reportCategory = data.category;
            this.params.region = data.region;
            this.params.cntId = data.cntId;
            this.params.cntName = data.cntName
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        let request = new ReportDynamicPageRequest();
        request.countCode = this.params.reportCategory.code;
        request.cntId = this.params.cntId;
        request.regionId = this.params.region?.id;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.reportService.getReportDynamicPage(request).subscribe(
            {
                next: response => {
                    this.params.list = response.data ? response.data : [];
                    this.params.region = response.region;
                    this.params.pagination.totalItems = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            }
        )
    }

    getTitle() {
        return this.params.reportCategory.nameRu + ' / ' + this.params.region?.nameRu + ' / ' + this.params.cntName;
    }

    downloadList() {
        let request = new ReportDynamicPageRequest();
        request.countCode = this.params.reportCategory.code;
        request.cntId = this.params.cntId;
        request.regionId = this.params.region?.id;
        this.reportService.downloadReportDynamicList(request, "report-dynamic-list.xlsx");
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
