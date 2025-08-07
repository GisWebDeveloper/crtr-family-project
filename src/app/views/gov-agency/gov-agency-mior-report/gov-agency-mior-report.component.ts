import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {UtilService} from "../../../services/util.service";
import {GovAgencyService} from "../../../services/gov-agency.service";

@Component({
    selector: 'app-gov-agency-mior-report',
    templateUrl: './gov-agency-mior-report.component.html',
    styleUrls: ['./gov-agency-mior-report.component.scss']
})
export class GovAgencyMiorReportComponent implements OnInit {

    @Output() eventShowReportNEET: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();

    constructor(
        private dictionaryService: DictionaryService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MIOR_LIST_NEET_CODE).subscribe({
            next: response => {
                if (response && response.length > 0) this.eventShowReportNEET.emit(response[0]);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

}
