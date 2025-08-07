import {Component, OnInit} from '@angular/core';
import {WelfareService} from "../../../services/welfare.service";
import {UtilService} from "../../../services/util.service";
import {WelfareFamilyType} from "../../../models/welfare/welfare-family-type";
import {WelfareRequest} from "../../../models/welfare/welfare-request";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {DictionaryMonth} from "../../../models/dictionary-month";

@Component({
    selector: 'app-welfare-history',
    templateUrl: './welfare-history.component.html',
    styleUrls: ['./welfare-history.component.scss']
})
export class WelfareHistoryComponent implements OnInit {

    // 0. FILTER
    visible = [true];

    filter: {
        familyType: Dictionary | undefined,
        monthYear: DictionaryMonth | undefined
        //month: Dictionary | undefined,
        //year: number
    }
    categoryList: string[];
    familyTypeDictionary: Array<Dictionary>;
    //monthDictionary: Array<Dictionary>;
    monthYearDictionary: Array<DictionaryMonth>;
    statList: Array<WelfareFamilyType>;
    statTotal: WelfareFamilyType;

    //yearList: Array<number>;

    constructor(private dictionaryService: DictionaryService,
                public utilService: UtilService,
                private welfareService: WelfareService) {
    }

    ngOnInit(): void {
        this.categoryList = ['A', 'B', 'C', 'D', 'E'];
        this.familyTypeDictionary = this.dictionaryService.getDictionaryFamilyType();
        this.monthYearDictionary = this.dictionaryService.getMonthYearDictionary(2022);
        //this.monthDictionary = this.dictionaryService.getMonthDictionary();
        //this.yearList = this.dictionaryService.getYearList();

        this.statTotal = new WelfareFamilyType();
        this.filter = {familyType: undefined, monthYear: this.getCurrentMonthYear()}

        this.initStatList();
    }

    initStatList() {
        this.statList = [];
        if (this.filter.monthYear) {
            let request = new WelfareRequest();
            request.year = this.filter.monthYear.year;
            request.month = this.filter.monthYear.month;
            if (this.filter.familyType) request.id = this.filter.familyType.id;
            //request.year = this.filter.year;
            //if (this.filter.month) request.month = this.filter.month.id;
            this.welfareService.getWelfareByFamilyTypeStat(request).subscribe({
                next: response => {
                    this.statList = response;
                    this.calcTotals(this.statList);
                }, error: reportError => {
                    this.utilService.displayError(reportError);
                }
            });
        }
    }

    search() {
        this.initStatList();
    }

    calcTotals(list: Array<WelfareFamilyType>) {
        let total = new WelfareFamilyType();
        total.cntA = this.utilService.getArrayFieldSum(list, 'cntA');
        total.cntB = this.utilService.getArrayFieldSum(list, 'cntB');
        total.cntC = this.utilService.getArrayFieldSum(list, 'cntC');
        total.cntD = this.utilService.getArrayFieldSum(list, 'cntD');
        total.cntE = this.utilService.getArrayFieldSum(list, 'cntE');
        total.total = this.utilService.getArrayFieldSum(list, 'total');
        this.statTotal = total;
    }

    private getCurrentYear(): number {
        return (new Date()).getFullYear();
    }

    /*
    private getCurrentMonth(): Dictionary | undefined {
        return this.monthDictionary.find(item => item.id == ((new Date()).getMonth()) + 1);
    }*/

    private getCurrentMonthYear(): DictionaryMonth | undefined {
        return this.monthYearDictionary.find(item => item.year == this.getCurrentYear() && item.month == ((new Date()).getMonth()) + 1);
    }

}
