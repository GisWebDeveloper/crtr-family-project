import {Component, OnInit} from '@angular/core';
import {Pagination} from "../../models/pagination";
import {UtilService} from "../../services/util.service";
import {DictionaryService} from "../../services/dictionary.service";
import {Region} from "../../models/region";
import {NecessityService} from "../../services/necessity.service";

@Component({
    selector: 'app-necessity',
    templateUrl: './necessity.component.html',
    styleUrls: ['./necessity.component.scss']
})
export class NecessityComponent implements OnInit {

    visible = [true];

    dictionaryRegion: Array<Region> = [];

    pagination: Pagination = new Pagination();
    stateId: number | undefined;
    countStatList: { period: string, buildYear: number, buildMonth: number, summ: number, cntFam: number, checkBox: boolean }[] = [];
    selectedIndex: number;
    list: any[];
    checkBox: boolean[];

    constructor(public utilService: UtilService,
                public necessityService: NecessityService,
                private dictionaryService: DictionaryService) {
    }

    ngOnInit(): void {
        this.initDictionaries();
        this.initCountStatList()
    }

    private initDictionaries() {
        this.dictionaryService.getRegionChildren().subscribe({
            next: response => {
                const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                this.dictionaryRegion = this.utilService.sortArray(response || [], nameField);

                let region: Region = new Region();
                region.id = 1;
                region.nameRu = 'PK';
                region.nameKz = 'PK';
                this.dictionaryRegion.push(region);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }


    changePage(page: number) {
        this.pagination.currentPage = page;
        this.selectMemberPage(this.selectedIndex);
    }

    searchCountStat() {
        this.countStatList = [];
        this.list = [];
        let param = {
            stateId: this.stateId
        }
        this.necessityService.getStat(param).subscribe({
            next: response => {
                this.countStatList = response;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    private initCountStatList() {
        this.searchCountStat();
    }

    selectMemberPage(index: number) {
        this.selectedIndex = index;
        let request = {
            stateId: this.stateId,
            page: this.pagination.currentPage,
            size: this.pagination.itemsPerPage,
            buildYear: this.countStatList[index].buildYear,
            buildMonth: this.countStatList[index].buildMonth
        };
        this.necessityService.getMember(request).subscribe({
            next: response => {
                this.list = response.data;
                this.pagination.totalItems = response.total;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    sendMembers() {
        this.utilService.notifySuccess('Потребность сформирован');
    }

    isAnySet() {
        if (!this.countStatList || this.countStatList.length === 0) {
            return true;
        }

        for (let i = 0; i < this.countStatList.length; i++) {
            if (this.countStatList[i].checkBox) {
                return false;
            }
        }

        return true;
    }
}
