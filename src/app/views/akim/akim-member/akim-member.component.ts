import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CountStatItem} from "../../../models/count-stat-item";
import {Pagination} from "../../../models/pagination";
import {Permissions} from "../../../models/administration/permissions";
import {UserRoleService} from "../../../services/user-role.service";
import {UtilService} from "../../../services/util.service";
import {AkimMember} from "../../../models/akim/akim-member";
import {AkimService} from "../../../services/akim.service";
import {DictionaryService} from "../../../services/dictionary.service";

interface TreeNode {
    id: string | number;
    nameRu: string;
    children?: TreeNode[];
    expanded?: boolean;
}

@Component({
    selector: 'app-akim-member',
    templateUrl: './akim-member.component.html',
    styleUrls: ['./akim-member.component.scss']
})
export class AkimMemberComponent implements OnInit {

    @Output() eventShowGraph: EventEmitter<{ param: string, label: string, xLabel: string, regionId?: number }> = new EventEmitter();

    @Output() eventShowGraph2: EventEmitter<{ param: string, label: string, index: number, regionId?: number }> = new EventEmitter();

    type: string = 'WEEKLY';

    filterOpen: boolean;
    visible = [true, true];
    countStatList: Array<CountStatItem>;
    filters: {
        label: string,
        checked: boolean,
        index: number
    }[] = [
        {label: 'akim-page.member.cnt3', checked: true, index: 3},
        {label: 'akim-page.member.cnt4', checked: true, index: 4},
        {label: 'akim-page.member.cnt5', checked: true, index: 5},
        {label: 'akim-page.member.cnt6', checked: true, index: 6},
        {label: 'akim-page.member.cnt7', checked: false, index: 7},
        {label: 'akim-page.member.cnt10', checked: false, index: 10},
        {label: 'akim-page.member.cnt11', checked: false, index: 11},
        {label: 'akim-page.member.cnt12', checked: false, index: 12},
        {label: 'akim-page.member.cnt13', checked: false, index: 13},
        {label: 'akim-page.member.cnt14', checked: false, index: 14},
        {label: 'akim-page.member.cnt15', checked: false, index: 15},
        {label: 'akim-page.member.cnt16', checked: false, index: 16},
        {label: 'akim-page.member.cnt17', checked: false, index: 17},
        {label: 'akim-page.member.cnt18', checked: false, index: 18}
    ];

    selectedFilters: {
        label: string,
        checked: boolean,
        index: number
    }[] = [];

    params: {
        iin: string | undefined,
        list: Array<AkimMember>,
        stat2: any | undefined;
        pagination: Pagination
    }
    index: number = 1;
    graphLabel: string;

    selectedRegionId: number | undefined;
    selectedIds: (string | number)[] = [2, 5];

    permissions = Permissions.PERMISSIONS;

    constructor(public userRoleService: UserRoleService,
                public utilService: UtilService,
                public akimService: AkimService,
                private dictionaryService: DictionaryService) {

        this.countStatList = new Array<CountStatItem>();
        this.params = {
            iin: undefined,
            list: new Array<AkimMember>(),
            pagination: new Pagination(),
            stat2: undefined
        }
    }

    ngOnInit(): void {
        this.selectCountItem();
        this.selectStat2()
        this.showGraph('cntMem', 'akim-page.stat.gbdfl', 'akim-page.stat.member', 1);
    }

    selectCountItem() {
        let request = {
            iin: this.params.iin !== '' ? this.params.iin : null,
            page: this.params.pagination.currentPage,
            size: this.params.pagination.itemsPerPage,
            regionId: this.selectedRegionId
        }

        this.akimService.getAkimMember(request).subscribe({
                next: response => {
                    this.params.list = response.data;
                    this.params.pagination.totalItems = response.total;
                    this.selectedFilters = this.filters.filter(temp => temp.checked);

                }, error: err => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(err));
                }
            }
        );
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.selectCountItem()
    }

    search() {
        this.selectCountItem();
    }

    downloadReport() {
        // if (this.params.countItem) {
        //     let requestParams: any = {
        //         userId: this.authService.getUserId(),
        //         countId: this.params.countItem.id
        //     };
        //     if (this.params.filterRegionId) {
        //         requestParams.regionId = this.params.filterRegionId;
        //     }
        //     this.reportService.downloadCountPersonListUrl(requestParams, "person-list.xlsx");
        // }
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

    private selectStat2() {
        this.akimService.getAkimStat2(this.selectedRegionId).subscribe({
            next: response => {
                this.params.stat2 = response;
            }, error: err => {
                this.utilService.notifyError(this.utilService.getErrorMessage(err));
            }
        });
    }

    showGraph(param: string, label: string, xLabel: string, index: number) {
        this.index = index;
        this.graphLabel = label;
        setTimeout(() => {
            this.eventShowGraph.emit({param: param, label: label, xLabel: xLabel, regionId: this.selectedRegionId});
        })
        // this.showGraph2(param, label, index);
    }

    showGraph2(param: string, label: string, index: number) {
        this.index = index;
        this.graphLabel = label;
        setTimeout(() => {
            this.eventShowGraph2.emit({param: param, label: label, index: index, regionId: this.selectedRegionId});
        })


    }

    showColumn(index: number) {
        return this.selectedFilters.filter(temp => temp.index === index).length > 0;
    }

    getAgeSharePercentage(cnt: number) {
        if (cnt) {
            return (100 * cnt / (this.params.stat2.age_0_18.cnt + this.params.stat2.age_18_35.cnt + this.params.stat2.age_35_45.cnt + this.params.stat2.age_45_65.cnt + this.params.stat2.age_65.cnt))
        }
        return 0;
    }

    loadChildrenFn = (param?: any) => this.dictionaryService.getRegionTree(param);

    onSelectionChange(selectedIds: (string | number)[]) {
        this.selectedIds = selectedIds;
        this.selectedRegionId = +selectedIds[0];
        if (selectedIds.length > 0) {
            this.selectedRegionId = +selectedIds[0];
        }
        this.selectCountItem();
        this.selectStat2()
        this.showGraph('cntMem', 'akim-page.stat.gbdfl', 'akim-page.stat.member', 1);
    }

    getPercentageFromPopulation(cnt: number): number {
        if (cnt && this.params?.stat2?.mem?.cnt) {
            return  cnt / this.params?.stat2?.mem?.cnt * 100;
        }
        return 0;
    }

    getPercentageFromSusn(cnt: number) {
        if (cnt && this.params?.stat2?.susnTotal?.cnt) {
            return  cnt / this.params?.stat2?.susnTotal?.cnt * 100;
        }
        return 0;
    }
}
