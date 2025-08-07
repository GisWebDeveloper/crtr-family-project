import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-gov-agency-mf-report',
    templateUrl: './gov-agency-mf-report.component.html',
    styleUrls: ['./gov-agency-mf-report.component.scss']
})
export class GovAgencyMfReportComponent implements OnInit {

    @Output() eventShowReportIP: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();

    constructor(
        private dictionaryService: DictionaryService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MF_LIST_IP_CODE).subscribe({
            next: response => {
                if (response && response.length > 0) this.eventShowReportIP.emit(response[0]);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

}
