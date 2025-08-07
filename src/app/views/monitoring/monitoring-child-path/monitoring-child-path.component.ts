import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {StatItemChildPath} from "../../../models/stat/stat-item-child-path";
import {StatItemPopulation} from "../../../models/stat/stat-item-population";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {DictionaryService} from "../../../services/dictionary.service";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-monitoring-child-path',
    templateUrl: './monitoring-child-path.component.html',
    styleUrls: ['./monitoring-child-path.component.scss']
})
export class MonitoringChildPathComponent implements OnInit {

    @Output() eventShowListModal: EventEmitter<StatItemDescription> = new EventEmitter<StatItemDescription>();

    statChildPathDictionary: Dictionary[];
    statItemList: Array<StatItemChildPath> = [];
    regionStatItemList: Array<StatItemChildPath> = [];
    regionChildStatItemList: Array<StatItemChildPath> = [];
    permissions = Permissions.PERMISSIONS;

    statItem: StatItemPopulation | undefined = undefined;

    constructor(
        private dictionaryService: DictionaryService,
        public statService: StatService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.statChildPathDictionary = this.dictionaryService.getStatChildPathDictionary();
        this.statChildPathDictionary = this.utilService.sortArray(this.statChildPathDictionary, 'order');

        this.statService.getStatChildPath().subscribe({
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
        let totalStat = new StatItemChildPath();
        this.statService.calculateTotalStat(this.regionStatItemList, totalStat);
        this.regionStatItemList.push(totalStat);
    }

    selectStatRegion(statItem: StatItemChildPath) {
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

    showListModal(statItem: StatItemChildPath, dictionary: Dictionary) {
        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        statItem.__proto__ = StatItemChildPath.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        statDescription.type = 'CHILD_PATH';
        statDescription.statItem = statItem;
        statDescription.table = this.utilService.getTranslationValue('menu.monitoring-child-path');
        statDescription.field = this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu);

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
