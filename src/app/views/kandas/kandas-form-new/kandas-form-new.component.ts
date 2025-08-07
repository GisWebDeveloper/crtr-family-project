import { Component, OnInit } from '@angular/core';
import {KandasMonitorAction} from "../../../models/kandas/kandas-monitor-action";
import {ActivatedRoute} from "@angular/router";
import {UtilService} from "../../../services/util.service";
import {KandasService} from "../../../services/kandas.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {KandasAnswer} from "../../../models/kandas/kandas-answer";

@Component({
  selector: 'app-kandas-form-new',
  templateUrl: './kandas-form-new.component.html',
  styleUrls: ['./kandas-form-new.component.scss']
})
export class KandasFormNewComponent implements OnInit {

    kandasMonitorActions: {id: number, nameRu: string, answerId: number}[];
    iin: string;
    fullName: string;
    kandasAnswers: KandasAnswer[];

    monitorStatuses = [4, 3, 5];

    constructor(private activatedRoute: ActivatedRoute,
                public utilService: UtilService,
                private kandasService: KandasService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            this.iin = params['iin'];
            const countId: number = +(params['countId']);

            this.kandasService.getKandasFormNew(countId, this.iin).subscribe({
                next: response => {
                    this.kandasMonitorActions = response.list;
                    this.fullName = this.utilService.getCapitalized(response.fullName);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });

            this.dictionaryService.getKandasAnswersDictionary(countId).subscribe({
                next: response => {
                    this.kandasAnswers = response.filter(temp => temp.id != 4 && temp.id != 9);
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        });
    }

}
