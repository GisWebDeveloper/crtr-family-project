import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {StatService} from "../../../services/stat.service";
import {UtilService} from "../../../services/util.service";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {StatItemFamilyTypeV2} from "../../../models/stat/stat-item-family-type-v2";
import {StatItemBase} from "../../../models/stat/stat-item-base";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-stat-main-family-type',
    templateUrl: './stat-main-family-type.component.html',
    styleUrls: ['./stat-main-family-type.component.scss']
})
export class StatMainFamilyTypeComponent implements OnInit {

    @Input() familyTypeDictionary: Dictionary[];
    @Output() eventShowListModal: EventEmitter<any> = new EventEmitter<StatItemDescription>();

    statItemList: Array<StatItemFamilyTypeV2> = [];
    regionStatItemList: Array<StatItemFamilyTypeV2> = [];
    regionChildStatItemList: Array<StatItemFamilyTypeV2> = [];
    readonly permissions = Permissions.PERMISSIONS;

    statItem: StatItemFamilyTypeV2 | undefined = undefined;

    constructor(
        public statService: StatService,
        public utilService: UtilService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.statService.getStatFamilyTypeV2().subscribe({
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
    }

    selectStatRegion(statItem: StatItemFamilyTypeV2) {
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

    isSelectedRegion(statItem: StatItemBase): boolean {
        return !!this.statItem && (this.statItem.region.id === statItem.region.id || this.regionChildStatItemList.filter(stat => stat.region.parentId == statItem.region.id).length > 0);
    }

    showListModal(fieldType: string, statItem: StatItemFamilyTypeV2, dictionary: Dictionary) {
        // @ts-ignore - SET PROTO MANUALLY TO USE instanceof
        statItem.__proto__ = StatItemFamilyTypeV2.prototype;

        let statDescription = new StatItemDescription();
        statDescription.id = dictionary.id;
        statDescription.type = 'FAM_TYPE_' + fieldType;
        statDescription.statItem = statItem;
        statDescription.table = this.utilService.getTranslationValue('stat-page.labels.family-type-desc');

        let fieldDesc = this.utilService.getLocalization(dictionary.nameKz, dictionary.nameRu);
        fieldDesc = fieldDesc.concat(' / ').concat(fieldType === 'FAMILY' ? this.utilService.getTranslationValue('stat-page.family-list') : this.utilService.getTranslationValue('stat-page.person-list'));
        statDescription.field = fieldDesc;

        this.eventShowListModal.emit(statDescription);
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

}
