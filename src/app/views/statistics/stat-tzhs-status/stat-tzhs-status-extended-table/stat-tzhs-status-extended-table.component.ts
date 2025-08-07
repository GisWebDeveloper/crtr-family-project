import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {StatService} from "../../../../services/stat.service";
import {UtilService} from "../../../../services/util.service";
import {UserRoleService} from "../../../../services/user-role.service";
import {StatItemTzhs} from "../../../../models/stat/stat-item-tzhs";
import {StatItemTzhsStatus} from "../../../../models/stat/stat-item-tzhs-status";
import {StatItemTzhsExtended} from "../../../../models/stat/stat-item-tzhs-extended";
import {StatItemDescription} from "../../../../models/stat/stat-item-description";
import {StatItemTzhsExtendedStatus} from "../../../../models/stat/stat-item-tzhs-extended-status";
import {AuthService} from "../../../../services/auth.service";
import {Permissions} from "../../../../models/administration/permissions";

@Component({
    selector: 'app-stat-tzhs-status-extended-table',
    templateUrl: './stat-tzhs-status-extended-table.component.html',
    styleUrls: ['./stat-tzhs-status-extended-table.component.scss']
})
export class StatTzhsStatusExtendedTableComponent implements OnChanges {

    @Input() statusDictionary: Dictionary;

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<Dictionary>();

    statItemList: Array<StatItemTzhsExtended> = [];
    regionStatItemList: Array<StatItemTzhsExtended> = [];
    regionChildStatItemList: Array<StatItemTzhsExtended> = [];
    statItem: StatItemTzhsExtended | StatItemTzhsStatus | undefined;
    readonly permissions = Permissions.PERMISSIONS;

    readonly labelList: string[] = [
        'A 1', 'A 2', 'A 3',
        'B 4', 'B 5', 'B 6',
        'C 7', 'C 8',
        'D 9', 'D 10', 'D 11',
        'E 12', 'E 13', 'E 14'
    ];

    constructor(private statService: StatService,
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
            this.statService.getTzhsExtendedStatusStat(statusCode).subscribe({
                next: response => {
                    this.statItemList = response;
                    response.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
                        stat.isHidden = false;
                        this.regionStatItemList.push(stat);
                    });
                    this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))

                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        } else {
            this.statService.getTzhsExtendedStat().subscribe({
                next: response => {
                    this.statItemList = response;
                    response.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
                        stat.isHidden = false;
                        this.regionStatItemList.push(stat);
                    });
                    this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0));
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        }
    }

    selectStatRegion(statItem: StatItemTzhsExtended | StatItemTzhsStatus) {
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

    isSelectedRegion(statItem: StatItemTzhs | StatItemTzhsStatus): boolean {
        return !!this.statItem && (this.statItem.region.id === statItem.region.id || this.regionChildStatItemList.filter(stat => stat.region.parentId == statItem.region.id).length > 0);
    }

    getStatValue(statItem: StatItemTzhs, field: string) {
        // @ts-ignore
        return this.utilService.numberFormat(statItem[field]);
    }

    showListModal(fieldType: string, statItem: StatItemTzhsExtended | StatItemTzhsExtendedStatus, id: number) {
        if (this.statusDictionary) {
            // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
            statItem.__proto__ = StatItemTzhsExtendedStatus.prototype;
        } else {
            // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
            statItem.__proto__ = StatItemTzhsExtended.prototype;
        }

        let statDescription = new StatItemDescription();
        statDescription.id = id;
        statDescription.type = 'WELFARE_STATUS_EXTENDED_' + fieldType;
        statDescription.statItem = statItem;

        let tableDesc = this.utilService.getTranslationValue('stat-page.labels.welfare-level-desc');
        if (statItem instanceof StatItemTzhsExtendedStatus && statItem.status) {
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

    getOnlyRegionStatItemList(): Array<StatItemTzhsExtended> {
        return this.regionStatItemList.filter(stat => stat.isTotal === false);
    }

    getOnlyTotalStatItemList(): Array<StatItemTzhsExtended> {
        return this.regionStatItemList.filter(stat => stat.isTotal === true);
    }
}
