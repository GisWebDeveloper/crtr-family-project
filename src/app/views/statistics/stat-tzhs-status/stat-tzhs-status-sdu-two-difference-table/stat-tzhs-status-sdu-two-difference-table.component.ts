import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../../models/dictionary";
import {StatItemTzhsTwo} from "../../../../models/stat/stat-item-tzhs-two";
import {Permissions} from "../../../../models/administration/permissions";
import {StatService} from "../../../../services/stat.service";
import {UtilService} from "../../../../services/util.service";
import {UserRoleService} from "../../../../services/user-role.service";
import {StatItemTzhsSdu} from "../../../../models/stat/stat-item-tzhs-sdu";
import {StatItemTzhsDiff} from "../../../../models/stat/stat-item-tzhs-diff";

@Component({
  selector: 'app-stat-tzhs-status-sdu-two-difference-table',
  templateUrl: './stat-tzhs-status-sdu-two-difference-table.component.html',
  styleUrls: ['./stat-tzhs-status-sdu-two-difference-table.component.scss']
})
export class StatTzhsStatusSduTwoDifferenceTableComponent implements OnChanges {

    @Input() statusDictionary: Dictionary;

    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<Dictionary>();

    statItemList: Array<StatItemTzhsTwo> = [];
    regionStatItemList: Array<StatItemTzhsTwo> = [];
    regionChildStatItemList: Array<StatItemTzhsTwo> = [];
    statItem: StatItemTzhsTwo | undefined;

    statSduItemList: Array<StatItemTzhsSdu> = [];

    statDiffItemList: Array<StatItemTzhsDiff> = [];
    regionStatDiffItemList: Array<StatItemTzhsDiff> = [];
    regionChildStatDiffItemList: Array<StatItemTzhsDiff> = [];
    statDiffItem: StatItemTzhsDiff | undefined;

    readonly permissions = Permissions.PERMISSIONS;

    labelList = ['1', '2', '3', '4', '5', '6'];

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
        this.statService.getTzhsStatTwo().subscribe({
            next: response => {
                this.statItemList = response;
                this.statService.getTzhsSduStat().subscribe({
                    next: response => {
                        this.statSduItemList = response.list;

                        for (let i = 0; i < this.statSduItemList.length; i++) {
                            let oldStat = this.statSduItemList[i];
                            let newStat: StatItemTzhsTwo;

                            if (oldStat.region && oldStat.stateRegion) {
                                newStat = this.statItemList.filter(temp =>
                                    temp.region.id === oldStat.region.id && temp.stateRegion.id === oldStat.stateRegion.id)[0];
                            } else if (oldStat.stateRegion){
                                    newStat= this.statItemList.filter(temp =>
                                        temp.stateRegion.id === oldStat.stateRegion.id)[0];
                            } else {
                                newStat = this.statItemList.filter(temp =>
                                    temp.region.id === oldStat.region.id)[0];
                            }
                            this.statDiffItemList.push({
                                familySduCountTotal: oldStat.familyCountTotal,
                                personSduCountTotal: oldStat.personCountTotal,
                                familyCountTotal: newStat.familyCountTotal,
                                personCountTotal: newStat.personCountTotal,
                                isHidden: oldStat.isHidden,
                                isTotal: oldStat.isTotal,
                                level: oldStat.level,
                                region: oldStat.region,
                                stateRegion: oldStat.stateRegion,
                                familyCount1: (newStat.familyCount5 + newStat.familyCount6),
                                familyCount2: newStat.familyCount4,
                                familyCount3: newStat.familyCount3,
                                familyCount4: newStat.familyCount2,
                                familyCount5: newStat.familyCount1,
                                familySduCount1: oldStat.familyCount1,
                                familySduCount2: oldStat.familyCount2,
                                familySduCount3: oldStat.familyCount3,
                                familySduCount4: oldStat.familyCount4,
                                familySduCount5: oldStat.familyCount5,
                                personCount1: (newStat.personCount5 + newStat.personCount6),
                                personCount2: newStat.personCount4,
                                personCount3: newStat.personCount3,
                                personCount4: newStat.personCount2,
                                personCount5: newStat.personCount1,
                                personSduCount1: oldStat.personCount1,
                                personSduCount2: oldStat.personCount2,
                                personSduCount3: oldStat.personCount3,
                                personSduCount4: oldStat.personCount4,
                                personSduCount5: oldStat.personCount5
                            });
                        }

                        this.statDiffItemList.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
                            stat.isHidden = false;
                            this.regionStatDiffItemList.push(stat);
                        });

                        this.regionStatDiffItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))


                    }, error: errorResponse => {
                        this.utilService.displayError(errorResponse);
                    }
                });
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });


        // if (statusCode) {
        //     this.statService.getTzhsSduStatusStat(statusCode).subscribe({
        //         next: response => {
        //             this.buildDate = response.buildDate;
        //             this.statItemList = response.list;
        //             response.list.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
        //                 stat.isHidden = false;
        //                 this.regionStatItemList.push(stat);
        //             });
        //             this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
        //
        //         }, error: errorResponse => {
        //             this.utilService.displayError(errorResponse);
        //         }
        //     });
        // } else {
        //     this.statService.getTzhsSduStat().subscribe({
        //         next: response => {
        //             this.buildDate = response.buildDate;
        //             this.statItemList = response.list;
        //             response.list.filter(stat => stat.level === 1 && stat.region.id != 99 && (stat.familyCountTotal > 0 || stat.personCountTotal > 0)).forEach(stat => {
        //                 stat.isHidden = false;
        //                 this.regionStatItemList.push(stat);
        //             });
        //             this.regionStatItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
        //
        //         }, error: errorResponse => {
        //             this.utilService.displayError(errorResponse);
        //         }
        //     });
        // }
    }

    selectStatRegion(statItem: StatItemTzhsDiff) {
        if (this.statDiffItem != statItem) {
            this.statDiffItem = statItem;
            if (statItem.level === 1) {
                this.regionChildStatDiffItemList = this.statDiffItemList.filter(stat => stat.region.parentId === statItem.region.id);
                this.regionChildStatDiffItemList.forEach(childStat => {
                    childStat.level = 2;
                    childStat.isHidden = false;
                });
                this.regionChildStatDiffItemList.sort((a, b) => (a.region.nameRu > b.region.nameRu) ? 1 : ((b.region.nameRu > a.region.nameRu) ? -1 : 0))
            }
        } else {
            this.statDiffItem = undefined;
        }
    }

    isSelectedRegion(statItem: StatItemTzhsDiff): boolean {
        return !!this.statDiffItem && (this.statDiffItem.region.id === statItem.region.id || this.regionChildStatDiffItemList.filter(stat => stat.region.parentId == statItem.region.id).length > 0);
    }

    search() {
        this.initStat();
    }

    getStatValue(statItem: StatItemTzhsDiff, field: string) {
        // @ts-ignore
        return this.utilService.numberFormat(statItem[field]);
    }

    showListModal(fieldType: string, statItem: StatItemTzhsDiff, id: number) {
        // // if (this.statusDictionary) {
        // //     // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        // //     statItem.__proto__ = StatItemTzhsSduStatus.prototype;
        // // } else {
        // //     // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        // //     statItem.__proto__ = StatItemTzhsSdu.prototype;
        // // }
        //
        // let statDescription = new StatItemDescription();
        // statDescription.id = id;
        // statDescription.type = 'WELFARE_STATUS_TWO_' + fieldType;
        // statDescription.statItem = statItem;
        //
        // let tableDesc = this.utilService.getTranslationValue('stat-page.labels.welfare-level-desc');
        // // if (statItem instanceof StatItemTzhsSduStatus && statItem.status) {
        // //     tableDesc = tableDesc.concat(' / ').concat(this.utilService.getLocalization(statItem.status.nameKz, statItem.status.nameRu));
        // // }
        // tableDesc = tableDesc.concat(' / ').concat(this.labelList[id - 1]);
        // statDescription.table = tableDesc;
        //
        // statDescription.field = fieldType === 'FAMILY' ? this.utilService.getTranslationValue('stat-page.family-list') : this.utilService.getTranslationValue('stat-page.person-list');
        //
        // this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

}
