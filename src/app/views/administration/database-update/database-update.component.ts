import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AdministrationService} from "../../../services/administration.service";
import {UtilService} from "../../../services/util.service";
import {DatabaseUpdateProcedureInfo} from "../../../models/administration/database-update-procedure-info";
import {KandasModalDescription} from "../../../models/kandas/kandas-modal-description";
import {PersonDetailGeneral} from "../../../models/person/person-detail-general";
import {Pagination} from "../../../models/pagination";

@Component({
    selector: 'app-database-update',
    templateUrl: './database-update.component.html',
    styleUrls: ['./database-update.component.scss']
})
export class DatabaseUpdateComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<DatabaseUpdateProcedureInfo>();

    procedureList: DatabaseUpdateProcedureInfo[] = [];

    constructor(private administrationService: AdministrationService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.administrationService.getUpdateProcedureList().subscribe({
            next: response => {
                this.procedureList = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    showLogs(item: DatabaseUpdateProcedureInfo) {
        this.eventShowListModal.emit(item);
    }

    runProcedure(item: DatabaseUpdateProcedureInfo) {
        this.administrationService.runUpdateProcedure(item.id).subscribe({
            next: response => {
                this.utilService.notifySuccess(this.utilService.getTranslationValue('administration-page.db-update.run') + ' ' + item.nameRu);
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }
}
