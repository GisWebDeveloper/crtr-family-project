import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatItemPopulation} from "../../../models/stat/stat-item-population";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {StatItemFamilyIncomePM} from "../../../models/stat/stat-item-family-income-pm";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-stat-main-income-pm',
    templateUrl: './stat-main-income-pm.component.html',
    styleUrls: ['./stat-main-income-pm.component.scss']
})
export class StatMainIncomePmComponent implements OnInit {

    @Input() incomePmDictionary: Dictionary[];
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    statItemList: Array<StatItemFamilyIncomePM> = [];
    regionStatItemList: Array<StatItemFamilyIncomePM> = [];
    regionChildStatItemList: Array<StatItemFamilyIncomePM> = [];
    readonly permissions = Permissions.PERMISSIONS;

    statItem: StatItemPopulation | undefined = undefined;

    constructor(
        public statService: StatService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.statService.getStatFamilyIncomePM().subscribe({
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
        let totalStat = new StatItemFamilyIncomePM();
        this.statService.calculateTotalStat(this.regionStatItemList, totalStat);
        this.regionStatItemList.push(totalStat);
    }

    selectStatRegion(statItem: StatItemFamilyIncomePM) {
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

    showListModal(statItem: StatItemFamilyIncomePM, dictionary: Dictionary, type: string) {
        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        statItem.__proto__ = StatItemFamilyIncomePM.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        statDescription.type = type;
        statDescription.statItem = statItem;
        statDescription.table = this.utilService.getTranslationValue('stat-page.labels.income-pm-desc');
        statDescription.field = this.utilService.getTranslationValue(dictionary.nameKz, dictionary.nameRu);

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
