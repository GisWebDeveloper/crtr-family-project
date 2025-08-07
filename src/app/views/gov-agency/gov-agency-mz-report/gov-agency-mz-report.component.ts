import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {UtilService} from "../../../services/util.service";
import {GovAgencyService} from "../../../services/gov-agency.service";

@Component({
    selector: 'app-gov-agency-mz-report',
    templateUrl: './gov-agency-mz-report.component.html',
    styleUrls: ['./gov-agency-mz-report.component.scss']
})
export class GovAgencyMzReportComponent implements OnInit {

    @Output() eventShowReportOSMS: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();

    constructor(
        private dictionaryService: DictionaryService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MZ_LIST_OSMS_CODE).subscribe({
            next: response => {
                if (response && response.length > 0) this.eventShowReportOSMS.emit(response[0]);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

}
