import {Component, OnInit} from '@angular/core';
import {CountStatItem} from "../../../models/count-stat-item";
import {PersonDetail} from "../../../models/person/person-detail";
import {Pagination} from "../../../models/pagination";
import {Region} from "../../../models/region";
import {DictionaryService} from "../../../services/dictionary.service";
import {UtilService} from "../../../services/util.service";
import {WorkspaceService} from "../../../services/workspace.service";
import {GovAgencyService} from "../../../services/gov-agency.service";
import {Dictionary} from "../../../models/dictionary";
import {AuthService} from "../../../services/auth.service";
import {ReportService} from "../../../services/report.service";

@Component({
    selector: 'app-gov-agency-mz-list',
    templateUrl: './gov-agency-mz-list.component.html',
    styleUrls: ['./gov-agency-mz-list.component.scss']
})
export class GovAgencyMzListComponent implements OnInit {

    visible = [true];

    countIdWithoutForm = 1060;

    params: {
        countItem: CountStatItem | undefined,
        filterRegionId: number | null,
        filterAction: string,
        filterActionCode: string,
        filterIinValues: string,
        famTzhs: string | null,
        date: Date | null;
        hospital: string | null,
        list: Array<PersonDetail>,
        pagination: Pagination
    }

    countStatList: Array<CountStatItem>;
    dictionaryRegion: Array<Region> = [];
    dictionaryActionConfirmation: Dictionary[];
    dictionaryTzhs: string[];
    dictionaryActionOSMS: Array<Dictionary>;
    dictionaryRefreshableOsmsDates: Date[];
    dictionaryRefreshableOsmsHospitals: { ord: string, nameRu: string }[];

    constructor(private authService: AuthService,
                private dictionaryService: DictionaryService,
                public govAgencyService: GovAgencyService,
                private reportService: ReportService,
                public utilService: UtilService,
                private workspaceService: WorkspaceService) {

        this.countStatList = new Array<CountStatItem>();
        this.params = {
            countItem: undefined,
            filterRegionId: null,
            filterAction: '',
            filterActionCode: '',
            filterIinValues: '',
            famTzhs: null,
            date: null,
            hospital: null,
            list: new Array<PersonDetail>(),
            pagination: new Pagination()
        }
        this.dictionaryActionConfirmation = this.dictionaryService.getDictionaryActionConfirmation();
    }

    ngOnInit(): void {
        this.initCountStatList();
        this.initDictionaries();
    }

    initCountStatList() {
        this.workspaceService.getStat({
            countCode: GovAgencyService.MZ_LIST_CODE_PREFIX,
            regionId: this.params.filterRegionId
        }).subscribe({
            next: response => {
                this.countStatList = response;
                this.countStatList.sort((a, b) => (a.countDictionary.nameRu > b.countDictionary.nameRu) ? 1 : ((b.countDictionary.nameRu > a.countDictionary.nameRu) ? -1 : 0))
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    private initDictionaries() {
        this.dictionaryService.getRegionChildren().subscribe({
            next: response => {
                const nameField = this.utilService.getLocalization('nameKz', 'nameRu');
                this.dictionaryRegion = this.utilService.sortArray(response || [], nameField);
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
        this.dictionaryService.getDictionaryGovAction(GovAgencyService.MZ_OSMS_CODE_PREFIX).subscribe({
            next: response => {
                this.dictionaryActionOSMS = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
        this.dictionaryService.getFamilyTzhsDictionary2().subscribe({
            next: response => {
                this.dictionaryTzhs = Array.from(new Set(response.map((temp: { nameRu: any; }) => temp.nameRu)));
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });

        this.dictionaryService.getRefreshableOsmsDates().subscribe({
            next: response => {
                this.dictionaryRefreshableOsmsDates = response.dates;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });

        this.dictionaryService.getRefreshableOsmsHospitals().subscribe({
            next: response => {
                this.dictionaryRefreshableOsmsHospitals = response;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    selectCountItem(ci: CountStatItem | undefined, searchByIin: boolean = false) {
        if (ci) {
            const isSameCount = this.params.countItem && this.params.countItem.countDictionary && this.params.countItem.countDictionary.code == ci.countDictionary.code;
            if (!isSameCount) {
                this.params.pagination.currentPage = 1;
                this.resetForm();
            }
            if (searchByIin) this.params.pagination.currentPage = 1;
            let filterRequest = {
                regionId: this.params.filterRegionId,
                actionCode: isSameCount ? (this.params.filterActionCode ? this.params.filterActionCode : this.params.filterAction) : '',
                countId: ci.countDictionary.id,
                famTzhs: this.params.famTzhs,
                iin: isSameCount ? this.params.filterIinValues : '',
                date: this.params.date,
                hospital: this.params.hospital,
                page: this.params.pagination.currentPage,
                size: this.params.pagination.itemsPerPage
            }
            this.params.countItem = ci;
            this.workspaceService.getStatPage(filterRequest).subscribe({
                next: response => {
                    this.params.list = response.countStatDetailList;
                    this.params.pagination.totalItems = response.total;
                },
                error: errorResponse => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
                }
            });
        }
    }

    selectCountAction() {
        this.params.filterActionCode = '';
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.selectCountItem(this.params.countItem)
    }

    searchCountStat() {
        this.params.countItem = undefined;
        this.params.list = [];
        this.initCountStatList();
    }

    search() {
        this.selectCountItem(this.params.countItem, true);
    }

    resetForm() {
        this.params.filterAction = '';
        this.params.filterActionCode = '';
        this.params.filterIinValues = '';
    }

    /*
    getActionConfirmationName(): string {
        let result = '';
        if (this.params.filterAction) {
            const dictAction = this.dictionaryCountActionConfirmation.find(dict => dict.code === this.params.filterAction);
            if (dictAction) result = this.utilService.getLocalization(dictAction.nameKz, dictAction.nameRu);
        }
        return result;
    }*/

    downloadReport() {
        if (this.params.countItem) {
            let requestParams: any = {
                userId: this.authService.getUserId(),
                countId: this.params.countItem.id,
                actionCode: this.params.filterActionCode ? this.params.filterActionCode : this.params.filterAction
            };
            if (this.params.date) {
                requestParams.date = this.params.date;
            }
            if (this.params.hospital) {
                requestParams.hospital = this.params.hospital;
            }
            if (this.params.famTzhs) {
                requestParams.famTzhs = this.params.famTzhs;
            }
            if (this.params.filterIinValues) {
                requestParams.iin = this.params.filterIinValues;
            }
            if (this.params.filterRegionId) {
                requestParams.regionId = this.params.filterRegionId;
            }
            this.reportService.downloadCountPersonListUrl(requestParams, "person-list.xlsx");
        }
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

}
