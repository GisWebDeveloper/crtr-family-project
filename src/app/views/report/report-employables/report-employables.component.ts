import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {DataService} from "../../../services/data.service";

@Component({
    selector: 'app-report-employables',
    templateUrl: './report-employables.component.html',
    styleUrls: ['./report-employables.component.scss']
})
export class ReportEmployablesComponent implements OnInit {

    @Output() eventShowReport: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();

    // 0. FILTER
    visible = [true];

    dictionaryReport: Array<Dictionary> = [];
    reportCategory: Dictionary | undefined;

    constructor(
        public dataService: DataService,
        private dictionaryService: DictionaryService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryReport = this.utilService.sortArray(this.dictionaryService.getDictionaryEmployables(), 'code');
        this.reportCategory = this.dictionaryReport.find(item => item.code == 'RC521');
        setTimeout(() => {
            this.search()
        }, 500);
    }

    search() {
        if (this.reportCategory) this.eventShowReport.emit(this.reportCategory);
    }

}
