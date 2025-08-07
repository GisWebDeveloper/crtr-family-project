import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatItemPopulation} from "../../../models/stat/stat-item-population";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {StatItemFamilyMemberCount} from "../../../models/stat/stat-item-family-member-count";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-stat-main-member-count',
    templateUrl: './stat-main-member-count.component.html',
    styleUrls: ['./stat-main-member-count.component.scss']
})
export class StatMainMemberCountComponent implements OnInit {

    @Input() statMemberDictionary: Dictionary[];
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    statItemList: Array<StatItemFamilyMemberCount> = [];
    regionStatItemList: Array<StatItemFamilyMemberCount> = [];
    regionChildStatItemList: Array<StatItemFamilyMemberCount> = [];
    readonly permissions = Permissions.PERMISSIONS;

    statItem: StatItemPopulation | undefined = undefined;

    constructor(
        public statService: StatService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.statService.getStatFamilyMemberCount().subscribe({
            next: response => {
                this.statItemList = response;
                response.filter(stat => stat.level === 1).forEach(stat => {
                    stat.isHidden = false;
                    stat.isTotal = false;
                    this.regionStatItemList.push(stat);
                });
                this.regionStatItemList = this.utilService.sortArray(this.regionStatItemList, 'regionNameRu');
                this.calculateTotal();
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
    }

    calculateTotal() {
        let totalStat = new StatItemFamilyMemberCount();
        this.statService.calculateTotalStat(this.regionStatItemList, totalStat);
        this.regionStatItemList.push(totalStat);
    }

    selectStatRegion(statItem: StatItemFamilyMemberCount) {
        if (this.statItem != statItem) {
            this.statItem = statItem;
            if (statItem.level === 1) {
                this.regionChildStatItemList = this.statItemList.filter(stat => stat.regionParentId === statItem.regionId);
                this.regionChildStatItemList.forEach(childStat => {
                    childStat.level = 2;
                    childStat.isHidden = false;
                });
                this.regionChildStatItemList = this.utilService.sortArray(this.regionChildStatItemList, 'regionNameRu');
            }
        } else {
            this.statItem = undefined;
        }
    }

    showListModal(statItem: StatItemFamilyMemberCount, dictionary: Dictionary) {
        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        statItem.__proto__ = StatItemFamilyMemberCount.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        statDescription.type = 'MEMBER';
        statDescription.statItem = statItem;
        statDescription.table = this.utilService.getTranslationValue('stat-page.labels.member-count-desc');
        statDescription.field = this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu);

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
