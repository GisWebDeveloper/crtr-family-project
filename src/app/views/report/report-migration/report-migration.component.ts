import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AspReport} from "../../../models/asp/asp-report";
import {UtilService} from "../../../services/util.service";
import {ReportService} from "../../../services/report.service";
import {Dictionary} from "../../../models/dictionary";
import {StatItemTzhsSdu} from "../../../models/stat/stat-item-tzhs-sdu";
import {StatItemTzhsSduStatus} from "../../../models/stat/stat-item-tzhs-sdu-status";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {Region} from "../../../models/region";

@Component({
    selector: 'app-report-migration',
    templateUrl: './report-migration.component.html',
    styleUrls: ['./report-migration.component.scss']
})
export class ReportMigrationComponent implements OnInit {

    public reportMigrationList: Array<any> = [];
    public reportTotal: any;
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<any>()

    constructor(public utilService: UtilService,
                public reportService: ReportService) {
        this.reportMigrationList = new Array<AspReport>();
    }

    ngOnInit(): void {
        this.reportService.getReportMigration().subscribe({
            next: response => {
                this.reportMigrationList = response.filter(temp => !temp.isTotal);
                this.reportTotal = response.filter(temp => temp.isTotal)[0];
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

        // this.reportService.getReportMigrationStatPage({stateId: 71, col: 10, page: 1, size: 10}).subscribe( {
        //     next: response => {
        //         console.log(response)
        //     }, error: errorResponse => {
        //         this.utilService.displayError(errorResponse);
        //     }
        // });
    }


    showListModal(state: Region, col: number) {
        let param: any = {};
        param.stateId = state.id;
        param.col = col;
        param.label = state.nameRu;
        this.eventShowListModal.emit(param);
    }


}
