import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {DictionaryService} from "../../../services/dictionary.service";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {KandasService} from "../../../services/kandas.service";
import {KandasPersonForm} from "../../../models/kandas/kandas-person-form";
import {KandasMonitorAction} from "../../../models/kandas/kandas-monitor-action";
import {KandasAnswer} from "../../../models/kandas/kandas-answer";

@Component({
    selector: 'app-form-kandas',
    templateUrl: './form-kandas.component.html',
    styleUrls: ['./form-kandas.component.scss']
})
export class FormKandasComponent implements OnInit {

    @Input() hasAdminPermissions: boolean;
    @Input() eventShowFormKandas: EventEmitter<{ iin: string, countId: number }>;

    iin: string;
    countId: number;
    kandasPersonForm: KandasPersonForm;
    kandasMonitorAction: KandasMonitorAction[];
    currentPersonFullName: string;
    kandasMonitorActions: {id: number, nameRu: string, answerId: number}[];
    fullName: string;
    kandasAnswers: KandasAnswer[];

    constructor(
        private dictionaryService: DictionaryService,
        public govAgencyService: GovAgencyService,
        public translateService: TranslateService,
        public utilService: UtilService,
        private workspaceService: WorkspaceService,
        private kandasService: KandasService) {
    }

    ngOnInit(): void {
        this.eventShowFormKandas.asObservable().subscribe(param => {
            this.iin = param.iin;
            this.countId = param.countId
            this.initPersonCountActions(param.iin);
            this.dictionaryService.getKandasAnswersDictionary(1058).subscribe({
                next: response => {
                    this.kandasAnswers = response.filter(temp => temp.id != 4 && temp.id != 9);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        });
    }

    private initPersonCountActions(iin: string) {
        this.kandasService.getKandasPersonForm(iin, this.countId).subscribe({
            next: response => {
                this.kandasPersonForm = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });

        this.getPersonForm(iin);
    }

    public getKandasMonitorName(id: number) {
        return this.kandasMonitorAction.find(temp => temp.id === id)?.nameRu;
    }

    public getKandasMonitorStatusName(id: number) {
        return this.kandasAnswers.find(temp => temp.id === id)?.nameRu;
    }

    public getPersonForm(iin: string) {
        this.kandasMonitorAction = [];
        this.kandasService.getKandasFormNew(this.countId, iin).subscribe({
            next: response => {
                this.kandasMonitorActions = response.list;
                this.currentPersonFullName = this.utilService.getCapitalized(response.fullName);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });


        // this.kandasService.getKandasForm(this.countId, iin).subscribe({
        //     next: response => {
        //         if (response) {
        //             this.currentPersonFullName = this.utilService.getCapitalized(response.fullName);
        //             this.kandasMonitorAction = response.list;
        //         }
        //     }, error: errorResponse => {
        //         const errorText = this.utilService.getErrorMessage(errorResponse);
        //         this.utilService.notifyError(errorText);
        //     }
        // });
    }
}
