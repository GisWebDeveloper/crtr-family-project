import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {StatusService} from "../../../services/status.service";
import {ReportService} from "../../../services/report.service";

@Component({
    selector: 'app-stat-main',
    templateUrl: './stat-main.component.html',
    styleUrls: ['./stat-main.component.scss']
})
export class StatMainComponent implements OnInit {

    @Output() eventSearchStatusStat: EventEmitter<Dictionary> = new EventEmitter<Dictionary>();
    // 0. FILTER
    visible = [true];

    familyTypeDictionary: Dictionary[];
    incomePmDictionary: Dictionary[];
    statChildDictionary: Dictionary[];
    statMemberDictionary: Dictionary[];
    statPopulationDictionary: Dictionary[];
    statSusnDictionary: Dictionary[];
    categoryDictionary: Array<Dictionary> = [];

    statType: string = 'POPULATION';
    status: Dictionary;
    tabNumber: number = 0;


    constructor(
        private dictionaryService: DictionaryService,
        public reportService: ReportService,
        private statusService: StatusService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.dictionaryService.getFamilyPmDictionary().subscribe({
            next: response => {
                this.incomePmDictionary = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
        this.familyTypeDictionary = this.dictionaryService.getDictionaryFamilyType();
        this.statChildDictionary = this.dictionaryService.getStatChildDictionary();
        this.statMemberDictionary = this.dictionaryService.getStatMemberDictionary();
        this.statPopulationDictionary = this.dictionaryService.getStatPopulationDictionary();
        this.statSusnDictionary = this.dictionaryService.getStatSusnDictionary();
        this.statSusnDictionary = this.utilService.sortArray(this.statSusnDictionary, 'order');

        this.statusService.getCategoryDictionaryList().subscribe({
            next: response => {
                this.categoryDictionary = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    setFilterValue(value: string) {
        this.statType = value;
    }

    search() {
        if (this.statType === 'TZHS-STATUS') {
            this.eventSearchStatusStat.emit(this.status);
        }
    }

    onTabNumberChange(tabNumber: any) {
        this.tabNumber = tabNumber;
    }
}
