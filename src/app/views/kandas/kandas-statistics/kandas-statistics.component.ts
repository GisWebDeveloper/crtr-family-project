import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {KandasService} from "../../../services/kandas.service";
import {UtilService} from "../../../services/util.service";
import {ReportService} from "../../../services/report.service";
import {KandasModalDescription} from "../../../models/kandas/kandas-modal-description";
import {Dictionary} from "../../../models/dictionary";
import {Region} from "../../../models/region";
import {DictionaryService} from "../../../services/dictionary.service";

@Component({
    selector: 'app-kandas-statistics',
    templateUrl: './kandas-statistics.component.html',
    styleUrls: ['./kandas-statistics.component.scss']
})
export class KandasStatisticsComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<KandasModalDescription>();

    kandasMonitorStat: { id: number, nameRu: string, cnt1: number, cnt2: number, cnt3: number, cnt4: number }[];

    countId: number;
    regionId: number;

    count: Dictionary;
    region: Region;

    constructor(private activatedRoute: ActivatedRoute,
                private kandasService: KandasService,
                private utilService: UtilService,
                public reportService: ReportService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(param => {
            this.regionId = +param['regionId'];
            this.countId = +param['countId'];

            this.kandasService.getKandasStat(this.countId, this.regionId).subscribe({
                next: response => {
                    this.kandasMonitorStat = response
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });

            this.dictionaryService.getDictionaryCountById(this.countId).subscribe({
                next: response => {
                    this.count = response
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });

            if (this.regionId) {
                this.dictionaryService.getRegionById(this.regionId).subscribe({
                    next: response => {
                        this.region = response
                    }, error: errorResponse => {
                        this.utilService.displayError(errorResponse);
                    }
                });
            }
        });

    }

    showListModal(monitorId: number, monitorName: string, monitorStatusId: number, isApproved? : boolean) {
        let modalDescription: KandasModalDescription = new KandasModalDescription();
        modalDescription.count = this.count;
        modalDescription.region = this.region;
        modalDescription.monitorId = monitorId;
        modalDescription.monitorName = monitorName;
        modalDescription.monitorStatusId = monitorStatusId;
        modalDescription.isApproved = isApproved;
        this.eventShowListModal.emit(modalDescription);
    }
}
