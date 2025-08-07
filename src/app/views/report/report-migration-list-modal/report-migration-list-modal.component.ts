import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Pagination} from "../../../models/pagination";
import {ReportService} from "../../../services/report.service";
import {StatService} from "../../../services/stat.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";

@Component({
  selector: 'app-report-migration-list-modal',
  templateUrl: './report-migration-list-modal.component.html',
  styleUrls: ['./report-migration-list-modal.component.scss']
})
export class ReportMigrationListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;
    params: {
        description: string, download: boolean, list: Array<any>,
        pagination: Pagination, stateId: number | undefined, col: number | undefined

    }

    constructor(
        private reportService: ReportService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            description: '', download: false, list: [],
            pagination: new Pagination(), stateId: undefined, col: undefined
        }
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.description = data.label;
            this.params.stateId = data.stateId;
            this.params.col = data.col;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    private initList() {
        let request:any = {};
        request.col = this.params.col;
        request.stateId = this.params.stateId;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;

        this.reportService.getReportMigrationStatPage(request).subscribe({
            next: response => {
                this.params.list = response.data ? response.data : [];
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

    downloadList() {

    }
}
