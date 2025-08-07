import {Component, OnInit} from '@angular/core';
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";

@Component({
    selector: 'app-report-proactive-sms',
    templateUrl: './report-proactive-sms.component.html',
    styleUrls: ['./report-proactive-sms.component.scss']
})
export class ReportProactiveSmsComponent implements OnInit {

    currentYear: number;
    dictionaryYear: Array<number>;
    dictionaryCount: Array<Dictionary> = [];

    constructor(
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService
    ) {
    }

    ngOnInit(): void {
        this.currentYear = this.getCurrentYear();
        this.dictionaryYear = this.dictionaryService.getYearList();
        this.dictionaryService.getDictionaryProactiveSmsCount().subscribe({
            next: response => {
                this.dictionaryCount = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    private getCurrentYear(): number {
        return (new Date()).getFullYear();
    }

}
