import {Component, OnInit} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-report-need-asp',
    templateUrl: './report-need-asp.component.html',
    styleUrls: ['./report-need-asp.component.scss']
})
export class ReportNeedAspComponent implements OnInit {

    dictionaryCount: Array<Dictionary> = [];

    constructor(
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount('S05').subscribe({
            next: response => {
                this.dictionaryCount = response.filter(item => item.id <= 130 && ['S0501', 'S0502'].includes(item.code));
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

}
