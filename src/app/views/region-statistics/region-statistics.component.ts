import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../services/util.service";
import {DictionaryService} from "../../services/dictionary.service";
import {Region} from "../../models/region";
import {RegionStatisticsFilter} from "../../models/region-statistics/region-statistics-filter";
import {RegionStatisticsService} from "../../services/region-statistics.service";
import {ReportRegionRanking} from "../../models/report/report-region-rating/report-region-ranking";
import {RegionStatistics} from "../../models/region-statistics/region-statistics";
import {Dictionary} from "../../models/dictionary";
import {PopulationAgeStatistics} from "../../models/region-statistics/population-age-statistics";


@Component({
    selector: 'app-population-rating',
    templateUrl: './region-statistics.component.html',
    styleUrls: ['./region-statistics.component.scss']
})
export class RegionStatisticsComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<{
        data: ReportRegionRanking<RegionStatistics> |
            {
                manAge: ReportRegionRanking<PopulationAgeStatistics>,
                womanAge: ReportRegionRanking<PopulationAgeStatistics>,
                field: string
            },
        type: string
    }>();
    visible = [true, true];
    dictionaryFamilyTzhsGroup = ['A', 'B', 'C', 'D', 'E'];
    dictionaryFamilyType: any[] = [];
    dictionaryRegion: Array<Region> = [];
    rating: Record<number, ReportRegionRanking<RegionStatistics>>;
    manAge: ReportRegionRanking<PopulationAgeStatistics>;
    womanAge: ReportRegionRanking<PopulationAgeStatistics>;
    ratingDictionary: Dictionary[];

    filter: RegionStatisticsFilter = new RegionStatisticsFilter();


    constructor(public translateService: TranslateService,
                public utilService: UtilService,
                private dictionaryService: DictionaryService,
                private regionStatisticsService: RegionStatisticsService) {
    }

    ngOnInit(): void {
        this.dictionaryFamilyType = this.dictionaryService.dictionaryToSelectOptions(this.dictionaryService.getDictionaryFamilyType(), true);
        this.dictionaryService.getRegionChildren().subscribe({
            next: response => {
                const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                this.dictionaryRegion = this.utilService.sortArray(response || [], nameField);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

        this.dictionaryService.getRatingDictionary().subscribe({
            next: response => {
                const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                this.ratingDictionary = this.utilService.sortArray(response || [], nameField);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });

        this.search();
    }

    search() {
        this.regionStatisticsService.getRegionStatistics(this.filter).subscribe({
            next: response => {
                this.rating = response.rating;
                this.manAge = response.manAge;
                this.womanAge = response.womanAge;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    getSusnDictionary() {
        return this.ratingDictionary.filter(temp => temp.parentId === 2).sort(this.customSort);
    }

    getDictionary(code: string) {
        return this.ratingDictionary.filter(temp => temp.code.startsWith(code)).sort(this.customSort);
    }

    customSort(a: Dictionary, b: Dictionary) {
        if (a.order === undefined && b.order === undefined) {
            return 0;
        }
        if (a.order === undefined) {
            return 1;
        }
        if (b.order === undefined) {
            return -1;
        }
        return a.order - b.order;
    }

    getAges() {
        let ages: number[] = [];
        for (let i = 0; i < 101; i++) {
            ages.push(i);
        }

        return ages;
    }

    getAgeState(age: number, sexId: number) {
        return this.utilService.getObjectFieldSum(sexId === 1 ? this.manAge.total : this.womanAge.total, 'age' + age)
    }

    showModal(nameId: number) {
        this.eventShowListModal.emit({data: this.rating[nameId], type: nameId === 1 ? 'population' : 'uniq'});
    }

    showAgeModal(age: number) {
        this.eventShowListModal.emit({data: {manAge: this.manAge, womanAge: this.womanAge, field: 'age' + age}, type: 'age'});
    }

}
