import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatItemPopulation} from "../../../models/stat/stat-item-population";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {StatItemChildPath} from "../../../models/stat/stat-item-child-path";
import {StatItemDescription} from "../../../models/stat/stat-item-description";

@Component({
    selector: 'app-stat-main-child-monitoring',
    templateUrl: './stat-main-child-monitoring.component.html',
    styleUrls: ['./stat-main-child-monitoring.component.scss']
})
export class StatMainChildMonitoringComponent implements OnInit {

    @Input() statChildPathDictionary: Dictionary[];
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    statItemList: Array<StatItemChildPath> = [];
    regionStatItemList: Array<StatItemChildPath> = [];
    regionChildStatItemList: Array<StatItemChildPath> = [];

    statItem: StatItemPopulation | undefined = undefined;

    constructor(
        public statService: StatService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
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
        statDescription.table = this.utilService.getTranslationValue('stat-page.labels.child-monitoring');
        statDescription.field = this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu);

        this.eventShowListModal.emit(statDescription);
    }

}
