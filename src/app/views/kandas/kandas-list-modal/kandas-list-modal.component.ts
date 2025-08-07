import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Pagination} from "../../../models/pagination";
import {UtilService} from "../../../services/util.service";
import {KandasModalDescription} from "../../../models/kandas/kandas-modal-description";
import {KandasService} from "../../../services/kandas.service";
import {KandasStatPageRequest} from "../../../models/kandas/kandas-stat-page-request";
import {PersonDetailGeneral} from "../../../models/person/person-detail-general";
import {DictionaryService} from "../../../services/dictionary.service";
import {ReportService} from "../../../services/report.service";

@Component({
    selector: 'app-kandas-list-modal',
    templateUrl: './kandas-list-modal.component.html',
    styleUrls: ['./kandas-list-modal.component.scss']
})
export class KandasListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    visible = false;
    params: {
        list: Array<PersonDetailGeneral>,
        modalDesc: KandasModalDescription,
        pagination: Pagination
    }
    dictionaryKandasMonitorStatus: { id: number, name: string }[];

    constructor(public utilService: UtilService,
                private kandasService: KandasService,
                private dictionaryService: DictionaryService,
                private reportService: ReportService) {
    }

    ngOnInit(): void {
        this.params = {
            list: [],
            modalDesc: new KandasModalDescription(),
            pagination: new Pagination()
        }
        this.dictionaryKandasMonitorStatus = this.dictionaryService.getDictionaryKandasMonitorStatus();
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.modalDesc = data;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        const modalDesc: KandasModalDescription = this.params.modalDesc;
        let request = new KandasStatPageRequest();
        request.countId = modalDesc.count.id;
        request.monitorId = modalDesc.monitorId;
        request.monitorStatusId = modalDesc.monitorStatusId;
        request.regionId = modalDesc.region?.id;
        request.isApproved = modalDesc.isApproved;

        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;

        this.kandasService.getKandasList(request).subscribe({
            next: response => {
                this.params.list = response.personDetailList ? response.personDetailList : [];
                this.params.pagination.totalItems = response.total;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

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

    getDescription() {
        return this.params.modalDesc.monitorName + ' / ' +
            this.dictionaryKandasMonitorStatus.find(temp => temp.id === this.params.modalDesc.monitorStatusId)?.name;
    }

    downloadList() {
        const modalDesc: KandasModalDescription = this.params.modalDesc;
        let request = new KandasStatPageRequest();
        request.countId = modalDesc.count.id;
        request.monitorId = modalDesc.monitorId;
        request.monitorStatusId = modalDesc.monitorStatusId;
        if (modalDesc.region) {
            request.regionId = modalDesc.region.id;
        }
        if (modalDesc.isApproved) {
            request.isApproved = modalDesc.isApproved;
        }

        return this.reportService.downloadKandasList(request, "kandas-list.xlsx");
    }
}
