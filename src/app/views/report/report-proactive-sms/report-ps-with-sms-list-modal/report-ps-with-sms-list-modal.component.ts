import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ReportModalDescription} from "../../../../models/report/report-modal-description";
import {Pagination} from "../../../../models/pagination";
import {ReportService} from "../../../../services/report.service";
import {UtilService} from "../../../../services/util.service";
import {ReportItemPageRequest} from "../../../../models/report/report-item-page-request";
import {PersonSmsDetail} from "../../../../models/person/person-sms-detail";

@Component({
    selector: 'app-report-ps-with-sms-list-modal',
    templateUrl: './report-ps-with-sms-list-modal.component.html',
    styleUrls: ['./report-ps-with-sms-list-modal.component.scss']
})
export class ReportPsWithSmsListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;
    params: {
        list: Array<PersonSmsDetail>,
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
        if (modalDesc.countItem || modalDesc.region) {
            let request = new ReportItemPageRequest();
            request.id = modalDesc.id;
            if (modalDesc.countItem) request.countId = modalDesc.countItem.id;
            if (modalDesc.region) request.regionId = modalDesc.region.id;
            if (modalDesc.year) request.year = modalDesc.year;
            request.page = this.params.pagination.currentPage;
            request.size = this.params.pagination.itemsPerPage;

            this.reportService.getProactiveSmsCategoryPage(request).subscribe({
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
        if (modalDesc.countItem) request.countId = modalDesc.countItem.id;
        if (modalDesc.region) request.regionId = modalDesc.region.id;
        if (modalDesc.year) request.year = modalDesc.year;
        this.reportService.downloadProactiveSmsPersonList(request, "person-list.xlsx");
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
