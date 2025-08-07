import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {ReportMfIp} from "../../../models/report/report-mf-ip";
import {UtilService} from "../../../services/util.service";
import {ReportService} from "../../../services/report.service";
import {CountPageRequest} from "../../../models/count/count-page-request";
import {ReportMvd} from "../../../models/report/report-mvd";
import {DictionaryService} from "../../../services/dictionary.service";
import {GovAgencyService} from "../../../services/gov-agency.service";

@Component({
  selector: 'app-gov-agency-mvd-report',
  templateUrl: './gov-agency-mvd-report.component.html',
  styleUrls: ['./gov-agency-mvd-report.component.scss']
})
export class GovAgencyMvdReportComponent implements OnInit {


    @Output() eventShowReportIP: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();

    constructor(
        private dictionaryService: DictionaryService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount(GovAgencyService.MVD_LIST_IP_CODE).subscribe({
            next: response => {
                if (response && response.length > 0) this.eventShowReportIP.emit(response[0]);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }


}
