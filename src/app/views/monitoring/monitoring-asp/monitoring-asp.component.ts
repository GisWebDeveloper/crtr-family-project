import {Component, OnInit} from '@angular/core';
import {MonitoringService} from "../../../services/monitoring.service";
import {UtilService} from "../../../services/util.service";
import {StatItemASP} from "../../../models/stat/stat-item-asp";
import {TranslateService} from "@ngx-translate/core";
import {Pagination} from "../../../models/pagination";
import {StatItemPageRequest} from "../../../models/stat/stat-item-page-request";
import {StatItemMemberAsp} from "../../../models/stat/stat-item-member-asp";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-monitoring-asp',
    templateUrl: './monitoring-asp.component.html',
    styleUrls: ['./monitoring-asp.component.scss']
})
export class MonitoringAspComponent implements OnInit {

    // 0. MONITORING PANEL // 1. LIST
    visible = [true, true];

    statASPList: Array<StatItemASP>;
    regionASPList: Array<StatItemASP>;
    params: {
        countId: number | undefined,
        list: Array<StatItemMemberAsp>,
        regionId: number | undefined,
        statItem: StatItemASP,
        statItemTotal: StatItemASP
        pagination: Pagination
    }
    permissions = Permissions.PERMISSIONS;

    constructor(
        private monitoringService: MonitoringService,
        public translateService: TranslateService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.initStatASP();
    }

    initStatASP() {
        this.statASPList = new Array<StatItemASP>();
        this.regionASPList = new Array<StatItemASP>();
        this.params = {
            countId: undefined,
            list: [],
            regionId: undefined,
            statItem: new StatItemASP(),
            statItemTotal: new StatItemASP(),
            pagination: new Pagination()
        }
        this.monitoringService.getStatASP({}).subscribe({
            next: response => {
                this.statASPList = response;
                this.processStatResponse(response);

            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    processStatResponse(statASPList: Array<StatItemASP>) {
        statASPList.filter(item => item.level === 1).forEach(item => {
            item.isHidden = false;
            item.isExpanded = false;
            this.regionASPList.push(item);
            let childCount = 0;
            statASPList.filter(childItem => childItem.regionParentId === item.regionId).forEach(childItem => {
                childCount = childCount + 1;
                childItem.level = 2;
                childItem.isHidden = true;
                this.regionASPList.push(childItem);
            });
        });
        this.calculateTotalStat();
    }

    calculateTotalStat() {
        this.regionASPList.filter(item => item.level == 1).forEach(item => {
            this.params.statItemTotal['cntAsp'] = (this.params.statItemTotal['cntAsp'] | 0) + (item.cntAsp | 0);
            this.params.statItemTotal['cntNotAsp'] = (this.params.statItemTotal['cntNotAsp'] | 0) + (item.cntNotAsp | 0);
        });
    }

    selectStatRegion(statItem: StatItemASP) {
        this.params.regionId = statItem.regionId;
        if (statItem.level == 1) {
            statItem.isExpanded = !statItem.isExpanded;
            this.regionASPList.filter(item => item.regionParentId === 1).forEach(item => {
                if (item.regionId != statItem.regionId) {
                    item.isExpanded = false;
                    this.regionASPList.filter(childItem => childItem.regionParentId === item.regionId).forEach(childItem => {
                        childItem.isHidden = true;
                    });
                }
            });
            this.regionASPList.filter(item => item.regionParentId === statItem.regionId).forEach(item => {
                item.isHidden = !item.isHidden;
            });
        }
    }

    getStatPersonList(statItem: StatItemASP, countId: number) {

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
                this.params.list = response.appDetailList;
                this.params.pagination.totalItems = response.total;
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    getRegionDescription(statItem: StatItemASP | undefined): string {
        let stateName = '', regionName = '';
        if (statItem) {
            if (statItem.level == 1) {
                stateName = this.translateService.currentLang === 'kz' ? statItem.regionNameKz : statItem.regionNameRu;
            } else {
                regionName = this.translateService.currentLang === 'kz' ? statItem.regionNameKz : statItem.regionNameRu;
                const parentStat = this.regionASPList.find(item => item.regionId == statItem.regionParentId);
                if (parentStat) stateName = this.translateService.currentLang === 'kz' ? parentStat.regionNameKz : parentStat.regionNameRu;
            }
        }
        return this.utilService.getRegionName(stateName, regionName);
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        if (this.params.statItem && this.params.countId) {
            this.getStatPersonList(this.params.statItem, this.params.countId);
        }
    }

    downloadReport() {
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
