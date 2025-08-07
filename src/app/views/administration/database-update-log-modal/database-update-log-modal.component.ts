import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {DatabaseUpdateProcedureInfo} from "../../../models/administration/database-update-procedure-info";
import {AdministrationService} from "../../../services/administration.service";
import {UpdateDatabaseProcedureLog} from "../../../models/administration/update-database-procedure-log";
import {Pagination} from "../../../models/pagination";
import {DatabaseUpdateProcedureLogsPage} from "../../../models/administration/database-update-procedure-logs-page";

@Component({
    selector: 'app-database-update-log-modal',
    templateUrl: './database-update-log-modal.component.html',
    styleUrls: ['./database-update-log-modal.component.scss']
})
export class DatabaseUpdateLogModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<DatabaseUpdateProcedureInfo>;

    params: {
        list: Array<UpdateDatabaseProcedureLog>,
        procedureInfo: DatabaseUpdateProcedureInfo,
        pagination: Pagination
    }
    visible = false;

    constructor(public utilService: UtilService,
                private administrationService: AdministrationService) {
    }

    ngOnInit(): void {
        this.params = {
            list: [],
            procedureInfo: new DatabaseUpdateProcedureInfo(),
            pagination: new Pagination()
        }
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.procedureInfo = data;
            this.params.pagination.currentPage = 1;
            this.initLogs();
        });
    }

    private initLogs() {
        let request: DatabaseUpdateProcedureLogsPage = new DatabaseUpdateProcedureLogsPage();
        request.id = this.params.procedureInfo.id
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;


        this.administrationService.getUpdateProcedureLogs(request).subscribe({
            next: response => {
                this.params.list = response.data ? response.data : [];
                this.params.pagination.totalItems = response.total;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    changePage(page: number) {
        this.params.pagination.currentPage = page;
        this.initLogs();
    }

}
