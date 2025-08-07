import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {StatService} from "../../../../services/stat.service";
import {UtilService} from "../../../../services/util.service";
import {UserRoleService} from "../../../../services/user-role.service";
import {StatItemDescription} from "../../../../models/stat/stat-item-description";
import {StatItemTzhsSdu} from "../../../../models/stat/stat-item-tzhs-sdu";
import {StatItemTzhsSduStatus} from "../../../../models/stat/stat-item-tzhs-sdu-status";
import {AuthService} from "../../../../services/auth.service";
import {Permissions} from "../../../../models/administration/permissions";

@Component({
  selector: 'app-stat-tzhs-status-sdu-table',
  templateUrl: './stat-tzhs-status-sdu-table.component.html',
  styleUrls: ['./stat-tzhs-status-sdu-table.component.scss']
})
export class StatTzhsStatusSduTableComponent implements OnChanges {

    @Input() statusDictionary: Dictionary;

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<Dictionary>();

    statItemList: Array<StatItemTzhsSdu> = [];
    regionStatItemList: Array<StatItemTzhsSdu> = [];
    regionChildStatItemList: Array<StatItemTzhsSdu> = [];
    statItem: StatItemTzhsSdu | StatItemTzhsSduStatus | undefined;
    readonly permissions = Permissions.PERMISSIONS;
    buildDate: string;

    labelList = ['A', 'B', 'C', 'D', 'E'];

    constructor(
        private statService: StatService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnChanges(): void {
        this.statItem = undefined;
        this.initStat();
    }

    private initStat() {
        this.regionStatItemList = [];
        this.regionChildStatItemList = [];
        const statusCode = this.statusDictionary ? this.statusDictionary.code : '';
        if (statusCode) {
            this.statService.getTzhsSduStatusStat(statusCode).subscribe({
                next: response => {
                    this.buildDate = response.buildDate;
                    this.statItemList = response.list;
                    response.list.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
                        stat.isHidden = false;
                        this.regionStatItemList.push(stat);
                    });
                    this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))

                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        } else {
            this.statService.getTzhsSduStat().subscribe({
                next: response => {
                    this.buildDate = response.buildDate;
                    this.statItemList = response.list;
                    response.list.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
                        stat.isHidden = false;
                        this.regionStatItemList.push(stat);
                    });
                    this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))

                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        }
    }

    selectStatRegion(statItem: StatItemTzhsSdu | StatItemTzhsSduStatus) {
        if (this.statItem != statItem) {
            this.statItem = statItem;
            if (statItem.level === 1) {
                this.regionChildStatItemList = this.statItemList.filter(stat => stat.region.parentId === statItem.region.id);
                this.regionChildStatItemList.forEach(childStat => {
                    childStat.level = 2;
                    childStat.isHidden = false;
                });
                this.regionChildStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
            }
        } else {
            this.statItem = undefined;
        }
    }

    isSelectedRegion(statItem: StatItemTzhsSdu | StatItemTzhsSduStatus): boolean {
        return !!this.statItem && (this.statItem.region.id === statItem.region.id || this.regionChildStatItemList.filter(stat => stat.region.parentId == statItem.region.id).length > 0);
    }

    search() {
        this.initStat();
    }

    getStatValue(statItem: StatItemTzhsSdu, field: string) {
        // @ts-ignore
        return this.utilService.numberFormat(statItem[field]);
    }

    showListModal(fieldType: string, statItem: StatItemTzhsSdu | StatItemTzhsSduStatus, id: number) {
        if (this.statusDictionary) {
            // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
            statItem.__proto__ = StatItemTzhsSduStatus.prototype;
        } else {
            // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
            statItem.__proto__ = StatItemTzhsSdu.prototype;
        }

        let statDescription = new StatItemDescription();
        statDescription.id = id;
        statDescription.type = 'WELFARE_STATUS_SDU_' + fieldType;
        statDescription.statItem = statItem;

        let tableDesc = this.utilService.getTranslationValue('stat-page.labels.welfare-level-desc');
        if (statItem instanceof StatItemTzhsSduStatus && statItem.status) {
            tableDesc = tableDesc.concat(' / ').concat(this.utilService.getLocalization(statItem.status.nameKz, statItem.status.nameRu));
        }
        tableDesc = tableDesc.concat(' / ').concat(this.labelList[id - 1]);
        statDescription.table = tableDesc;

        statDescription.field = fieldType === 'FAMILY' ? this.utilService.getTranslationValue('stat-page.family-list') : this.utilService.getTranslationValue('stat-page.person-list');

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

}
