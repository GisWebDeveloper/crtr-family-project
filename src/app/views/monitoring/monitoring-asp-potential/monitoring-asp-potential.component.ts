import {Component, OnInit} from '@angular/core';
import {StatItemMemberAsp} from "../../../models/stat/stat-item-member-asp";
import {MonitoringService} from "../../../services/monitoring.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {StatItemASPPotential} from "../../../models/stat/stat-item-asp-potential";

@Component({
    selector: 'app-monitoring-asp-potential',
    templateUrl: './monitoring-asp-potential.component.html',
    styleUrls: ['./monitoring-asp-potential.component.scss']
})
export class MonitoringAspPotentialComponent implements OnInit {

    // 0. MONITORING PANEL // 1. LIST
    visible = [true, true];

    dictionaryAspActions: Array<Dictionary>;
    statPotentialASPList: Array<StatItemASPPotential>;
    regionPotentialASPList: Array<StatItemASPPotential>;
    params: {
        countId: number | undefined,
        list: Array<StatItemMemberAsp>,
        regionId: number | undefined,
        statItem: StatItemASPPotential
        statItemTotal: StatItemASPPotential
    }

    constructor(
        private dictionaryService: DictionaryService,
        private monitoringService: MonitoringService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.statPotentialASPList = new Array<StatItemASPPotential>();
        this.regionPotentialASPList = new Array<StatItemASPPotential>();
        this.params = {
            countId: undefined,
            list: [],
            regionId: undefined,
            statItem: new StatItemASPPotential(),
            statItemTotal: new StatItemASPPotential(),
        }
        this.initDictionaries();
    }

    initDictionaries() {
        this.dictionaryService.getDictionaryASPAction().subscribe({
            next: response => {
                this.dictionaryAspActions = response.filter(item => item.id <= 4);
                this.initStatASPPotential();
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    initStatASPPotential() {
        this.monitoringService.getStatPotentialASP({}).subscribe({
            next: response => {
                this.statPotentialASPList = response;
                this.processStatResponse(response);
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    processStatResponse(statASPList: Array<StatItemASPPotential>) {
        statASPList.filter(item => item.level === 1).forEach(item => {
            item.isHidden = false;
            item.isExpanded = false;
            this.regionPotentialASPList.push(item);
            let childCount = 0;
            statASPList.filter(childItem => childItem.regionParentId === item.regionId).forEach(childItem => {
                childCount = childCount + 1;
                childItem.level = 2;
                childItem.isHidden = true;
                this.regionPotentialASPList.push(childItem);
            });
        });
        this.calculateTotalStat();
    }

    calculateTotalStat() {
        this.regionPotentialASPList.filter(item => item.level == 1).forEach(item => {
            this.params.statItemTotal['cnt1'] = (this.params.statItemTotal['cnt1'] | 0) + (item.cnt1 | 0);
            this.params.statItemTotal['cnt2'] = (this.params.statItemTotal['cnt2'] | 0) + (item.cnt2 | 0);
            this.params.statItemTotal['cnt3'] = (this.params.statItemTotal['cnt3'] | 0) + (item.cnt3 | 0);
            this.params.statItemTotal['cnt4'] = (this.params.statItemTotal['cnt4'] | 0) + (item.cnt4 | 0);
            this.params.statItemTotal['cnt5'] = (this.params.statItemTotal['cnt5'] | 0) + (item.cnt5 | 0);
        });
    }

    selectStatRegion(statItem: StatItemASPPotential) {
        this.params.regionId = statItem.regionId;
        if (statItem.level == 1) {
            statItem.isExpanded = !statItem.isExpanded;
            this.regionPotentialASPList.filter(item => item.regionParentId === 1).forEach(item => {
                if (item.regionId != statItem.regionId) {
                    item.isExpanded = false;
                    this.regionPotentialASPList.filter(childItem => childItem.regionParentId === item.regionId).forEach(childItem => {
                        childItem.isHidden = true;
                    });
                }
            });
            this.regionPotentialASPList.filter(item => item.regionParentId === statItem.regionId).forEach(item => {
                item.isHidden = !item.isHidden;
            });
        }
    }

    getStatPersonList(statItem: StatItemASPPotential, countId: number) {

        /*
        if (statItem.regionId != this.params.regionId || countId != this.params.countId) this.params.pagination.currentPage = 1;
        this.params.countId = countId;
        this.params.regionId = statItem.regionId;
        this.params.statItem = statItem;

        let request = new StatItemPageRequest();
        request.countId = countId;
        request.regionId = statItem.regionId;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.monitoringService.getStatListPage(request).subscribe({
            next: response => {

                console.log('- getStatListPage: ', response);

                this.params.list = response.appDetailList;
                this.params.pagination.totalItems = response.total;

                console.log('- list: ', this.params.list);

            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
        */
    }

}
