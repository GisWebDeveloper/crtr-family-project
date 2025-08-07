import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";
import {Dictionary} from "../../../models/dictionary";

@Component({
    selector: 'app-report-need-actions',
    templateUrl: './report-need-actions.component.html',
    styleUrls: ['./report-need-actions.component.scss']
})
export class ReportNeedActionsComponent implements OnInit {

    dictionaryCount: Array<Dictionary> = [];

    constructor(
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount('S05').subscribe({
            next: response => {
                this.dictionaryCount = response.filter(item => item.id <= 130 && !['S0501', 'S0502'].includes(item.code));
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }
}
