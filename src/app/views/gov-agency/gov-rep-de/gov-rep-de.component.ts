import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ReportService} from "../../../services/report.service";
import {UtilService} from "../../../services/util.service";
import {UserRoleService} from "../../../services/user-role.service";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {GovRepDeExtended} from "../../../models/report/gov-rep-de/gov-rep-de-extended";
import {StatItemBase} from "../../../models/stat/stat-item-base";
import {Region} from "../../../models/region";

@Component({
    selector: 'app-gov-rep-de',
    templateUrl: './gov-rep-de.component.html',
    styleUrls: ['./gov-rep-de.component.scss']
})
export class GovRepDEComponent implements OnInit {

    @Output() eventShowListModal = new EventEmitter<{
        nameId: number | undefined,
        date: string,
        region: Region | undefined,
        col: number,
        label: string
    }>();

    visible = [true, true];
    dictionaryCount: Array<Dictionary> = [];
    dates: Array<string> = [];
    columnDates: string[];
    statItemList : GovRepDeExtended[];
    regionStatItemList: Array<GovRepDeExtended> = [];
    regionChildStatItemList: Array<GovRepDeExtended> = [];
    filter: {
        countId: number | undefined,
        countDictionary: Dictionary | undefined
        date: string | undefined;
    }
    displayCountDictionary: Dictionary | undefined;
    statItem: GovRepDeExtended | undefined = undefined;

    constructor(public reportService: ReportService,
                public utilService: UtilService,
                private userRoleService: UserRoleService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        this.filter = {
            countId: undefined,
            countDictionary: undefined,
            date: ''
        }
        this.reportService.getGoDEDates().subscribe({
            next: response => {
                this.dates = response;
                this.dictionaryService.getDictionaryGoDECount().subscribe({
                    next: response => {
                        this.dictionaryCount = response;
                        this.filter.countId = this.dictionaryCount[0].id;
                        this.filter.countDictionary = this.dictionaryCount[0];
                        this.search();
                    }, error: errorResponse => {
                        this.utilService.displayError(errorResponse);
                    }
                });
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    search() {
        if (this.filter.countDictionary) {
            this.reportService.getReportGoDE({nameId: this.filter.countDictionary.id, date: this.filter.date }).subscribe({
                next: response => {
                   // stat.dmemSecond - stat.dmemFirst + stat.ememSecond - stat.ememFirst) / (stat.dmemFirst + stat.ememFirst) * 100
                    this.statItemList = response.data;
                    this.regionStatItemList = [];
                    response.data.filter(stat => stat.level === 1).forEach(stat => {
                        stat.isHidden = false;
                        this.regionStatItemList.push(stat);
                    });
                    this.regionStatItemList.sort((a, b) => a.region !== null && a.region.id === 99 ? -1 :
                        b.region !== null && b.region.id === 99 ? 1 :
                            (a.dmemSecond - a.dmemFirst + a.ememSecond - a.ememFirst) / (a.dmemFirst + a.ememFirst) * 100
                            - (b.dmemSecond - b.dmemFirst + b.ememSecond - b.ememFirst) / (b.dmemFirst + b.ememFirst) * 100);
                    //this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
                    this.columnDates = response.dates;
                    this.filter.date = this.columnDates[1];
                        this.displayCountDictionary = this.filter.countDictionary
                }, error: reportError => {
                    this.utilService.displayError(reportError);
                }
            });
        } else {
            this.utilService.notifyError('Выберите меру');
        }
    }

    initReportBenefit() {

    }

    selectStatRegion(statItem: GovRepDeExtended) {
        if (this.statItem != statItem) {
            this.statItem = statItem;
            if (statItem.level === 1) {
                this.regionChildStatItemList = this.statItemList.filter(stat => stat.region.parentId === statItem.region.id);
                this.regionChildStatItemList.forEach(childStat => {
                    childStat.level = 2;
                    childStat.isHidden = false;
                });
                this.regionChildStatItemList.sort((a, b) => a.region !== null && a.region.id === 99 ? -1 :
                    b.region !== null && b.region.id === 99 ? 1 :
                    (a.dmemSecond - a.dmemFirst + a.ememSecond - a.ememFirst) / (a.dmemFirst + a.ememFirst) * 100
                    - (b.dmemSecond - b.dmemFirst + b.ememSecond - b.ememFirst) / (b.dmemFirst + b.ememFirst) * 100);
                //this.regionChildStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
            }
        } else {
            this.statItem = undefined;
        }
    }

    isSelectedRegion(statItem: StatItemBase): boolean {
        return !!this.statItem && (this.statItem.region.id === statItem.region.id || this.regionChildStatItemList.filter(stat => stat.region.parentId == statItem.region.id).length > 0);
    }

    showListModal(col: number, region?: Region) {
        if (this.filter.date) {
            this.eventShowListModal.emit({
                nameId: this.filter.countDictionary?.id,
                date: this.filter.date,
                region: region,
                col: col,
                label: this.getLabel(col, region)
            });
        }
    }

    private getLabel(col: number, region: Region | undefined) {
        return this.filter.countDictionary?.nameRu + ' / ' + this.filter.date + ' / ' + (region ? region.nameRu : 'Всего')  + ' / ' + (col === 7 ? 'D' : 'E');
    }
}
