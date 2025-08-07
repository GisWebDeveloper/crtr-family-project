import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {ReportService} from "../../../services/report.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {Dictionary} from "../../../models/dictionary";
import {TableHeadersService} from "../../../services/table-headers.service";

@Component({
    selector: 'app-report-rating',
    templateUrl: './report-rating.component.html',
    styleUrls: ['./report-rating.component.scss']
})
export class ReportRatingComponent implements OnInit {

    visible = [true];

    ratingType = 'S4013';
    dictionaryRankingTypes: Dictionary[] = [];
    sortedRankingTypeCodes: string[] = ['S4013', 'S4010', 'S4011', 'S4012'];

    constructor(public utilService: UtilService,
                public reportService: ReportService,
                private dictionaryService: DictionaryService,
                public tableHeadersService: TableHeadersService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getDictionaryCount('S401').subscribe({
            next: response => {
                this.dictionaryRankingTypes = response.sort((a, b) => {
                    return this.sortedRankingTypeCodes.indexOf(a.code) - this.sortedRankingTypeCodes.indexOf(b.code);
                });
            },
            error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    setFilterValue(value: string) {
        this.ratingType = value;
    }

    getRatingType(): Dictionary {
        return this.dictionaryRankingTypes.filter(temp => temp.code === this.ratingType)[0];
    }
}
