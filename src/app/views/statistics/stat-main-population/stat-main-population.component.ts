import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {StatItemPopulation} from "../../../models/stat/stat-item-population";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-stat-main-population',
    templateUrl: './stat-main-population.component.html',
    styleUrls: ['./stat-main-population.component.scss']
})
export class StatMainPopulationComponent implements OnInit {

    @Input() statPopulationDictionary: Dictionary[];
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    statItemList: Array<StatItemPopulation> = [];
    regionStatItemList: Array<StatItemPopulation> = [];
    regionChildStatItemList: Array<StatItemPopulation> = [];
    readonly permissions = Permissions.PERMISSIONS;

    statItem: StatItemPopulation | undefined = undefined;

    constructor(
        public statService: StatService,
        public utilService: UtilService,
        public userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.statService.getStatPopulation().subscribe({
            next: response => {
                this.statItemList = response;
                response.filter(stat => stat.level === 1 && stat.regionId != 99).forEach(stat => {
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
        let totalStat = new StatItemPopulation();
        this.statService.calculateTotalStat(this.statItemList.filter(stat => stat.level === 1), totalStat);
        this.regionStatItemList.push(totalStat);
    }

    selectStatRegion(statItem: StatItemPopulation) {
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

    showListModal(statItem: StatItemPopulation, dictionary: Dictionary) {
        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        statItem.__proto__ = StatItemPopulation.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        statDescription.type = 'POPULATION';
        statDescription.statItem = statItem;
        statDescription.table = this.utilService.getTranslationValue('stat-page.labels.population-desc');
        statDescription.field = this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu);

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
