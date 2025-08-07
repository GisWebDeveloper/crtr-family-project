import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {PersonDetailGeneral} from "../../../../models/person/person-detail-general";
import {ReportModalDescription} from "../../../../models/report/report-modal-description";
import {Pagination} from "../../../../models/pagination";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";

@Component({
    selector: 'app-report-employables-list-modal',
    templateUrl: './report-employables-list-modal.component.html',
    styleUrls: ['./report-employables-list-modal.component.scss']
})
export class ReportEmployablesListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;
    params: {
        list: Array<PersonDetailGeneral>,
        modalDesc: ReportModalDescription,
        pagination: Pagination
    }

    constructor(
        private reportService: ReportService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            list: [],
            modalDesc: new ReportModalDescription(),
            pagination: new Pagination()
        }
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.modalDesc = data;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        const modalDesc: ReportModalDescription = this.params.modalDesc;
        if (modalDesc.region) {
            let request = new ReportItemPageRequest();
            request.id = modalDesc.id;
            if (modalDesc.countItem) request.countCode = modalDesc.countItem.code;
            if (modalDesc.region) request.regionId = modalDesc.region.id;
            request.page = this.params.pagination.currentPage;
            request.size = this.params.pagination.itemsPerPage;

            this.reportService.getReportEmployablesPage(request).subscribe({
                next: response => {
                    this.params.list = response.data ? response.data : [];
                    this.params.pagination.totalItems = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        }
    }

    downloadList() {
        const modalDesc: ReportModalDescription = this.params.modalDesc;
        let request = new ReportItemPageRequest();
        request.id = modalDesc.id;
        if (modalDesc.countItem) request.countCode = modalDesc.countItem.code;
        if (modalDesc.region) request.regionId = modalDesc.region.id;
        this.reportService.downloadEmployablePersonList(request, "person-list.xlsx");
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
