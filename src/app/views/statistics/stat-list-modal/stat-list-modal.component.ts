import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {StatItemTzhsStatus} from "../../../models/stat/stat-item-tzhs-status";
import {Pagination} from "../../../models/pagination";
import {StatService} from "../../../services/stat.service";
import {StatItemPageRequest} from "../../../models/stat/stat-item-page-request";
import {StatItemMember} from "../../../models/stat/stat-item-member";
import {TranslateService} from "@ngx-translate/core";
import {StatItem} from "../../../models/stat/stat-item";
import {StatItemDescription} from "../../../models/stat/stat-item-description";
import {ReportService} from "../../../services/report.service";
import {StatItemBase} from "../../../models/stat/stat-item-base";
import {StatItemFamilyTypeV2} from "../../../models/stat/stat-item-family-type-v2";
import {StatItemTzhs} from "../../../models/stat/stat-item-tzhs";
import {StatItemTzhsExtended} from "../../../models/stat/stat-item-tzhs-extended";
import {StatItemTzhsExtendedStatus} from "../../../models/stat/stat-item-tzhs-extended-status";
import {StatItemTzhsSdu} from "../../../models/stat/stat-item-tzhs-sdu";
import {StatItemTzhsSduStatus} from "../../../models/stat/stat-item-tzhs-sdu-status";
import {StatItemTzhsTwo} from "../../../models/stat/stat-item-tzhs-two";

@Component({
    selector: 'app-stat-list-modal',
    templateUrl: './stat-list-modal.component.html',
    styleUrls: ['./stat-list-modal.component.scss']
})
export class StatListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;
    params: {
        description: string, download: boolean, list: Array<StatItemMember>,
        pagination: Pagination, statDescription: StatItemDescription

    }

    constructor(
        private reportService: ReportService,
        private statService: StatService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.params = {
            description: '', download: false, list: [],
            pagination: new Pagination(), statDescription: new StatItemDescription()
        }
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
            this.params.description = this.getDescription(data);
            this.params.statDescription = data;
            this.params.pagination.currentPage = 1;
            this.initList();
        });
    }

    initList() {
        const statDescription: StatItemDescription = this.params.statDescription;
        if (statDescription.statItem) {
            let request = new StatItemPageRequest();
            request.id = statDescription.id;
            request.type = statDescription.type;
            request.page = this.params.pagination.currentPage;
            request.size = this.params.pagination.itemsPerPage;

            if (statDescription.statItem instanceof StatItemBase) {
                request.districtId = statDescription.statItem.region.parentId;
                request.regionId = statDescription.statItem.region.id;
                if (statDescription.statItem instanceof StatItemTzhsStatus) {
                    request.categoryId = statDescription.statItem.category.id;

                    this.statService.getTzhsStatusPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });

                } else if (statDescription.statItem instanceof StatItemTzhs) {

                    this.statService.getTzhsPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });

                } else if (statDescription.statItem instanceof StatItemTzhsExtendedStatus) {
                    request.categoryId = statDescription.statItem.category.id;

                    this.statService.getTzhsExtendedStatusPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });

                }  else if (statDescription.statItem instanceof StatItemTzhsExtended) {

                    this.statService.getTzhsExtendedPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });

                } else if (statDescription.statItem instanceof StatItemTzhsSduStatus) {
                    request.categoryId = statDescription.statItem.category.id;

                    this.statService.getTzhsSduStatusPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });

                } else if (statDescription.statItem instanceof StatItemTzhsSdu) {

                    this.statService.getTzhsSduPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });
                } else if (statDescription.statItem instanceof StatItemTzhsTwo) {

                    this.statService.getTzhsTwoPersonList(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });
                } else if (statDescription.statItem instanceof StatItemFamilyTypeV2) {

                    this.statService.getFamilyTypePersonListV2(request).subscribe({
                        next: response => {
                            this.params.list = response.personDetailList ? response.personDetailList : [];
                            this.params.pagination.totalItems = response.total;
                            this.updateDownloadPermission();
                        }, error: errorResponse => {
                            this.utilService.displayError(errorResponse);
                        }
                    });
                }
            } else {
                request.districtId = statDescription.statItem.regionParentId;
                request.regionId = statDescription.statItem.regionId;
                this.statService.getStatPersonList(request).subscribe({
                    next: response => {
                        this.params.list = response.personDetailList ? response.personDetailList : [];
                        this.params.pagination.totalItems = response.total;
                        this.updateDownloadPermission();
                    }, error: errorResponse => {
                        this.utilService.displayError(errorResponse);
                    }
                });
            }
        }
    }

    getDescription(statDescription: StatItemDescription): string {
        // REGION DESC
        let stateName = '', regionName = '', regionDesc = '';
        let statItem: StatItem | StatItemBase | undefined = statDescription.statItem;
        if (statItem && statItem instanceof StatItemBase) {
            if (statItem.region.parentId === 1) {
                stateName = this.translateService.currentLang === 'kz' ? statItem.region.nameKz : statItem.region.nameRu;
            } else {
                regionName = this.translateService.currentLang === 'kz' ? statItem.region.nameKz : statItem.region.nameRu;
                if (statItem.stateRegion) stateName = this.translateService.currentLang === 'kz' ? statItem.stateRegion.nameKz : statItem.stateRegion.nameRu;
            }
        } else if (statItem) {
            regionName = this.translateService.currentLang === 'kz' ? statItem.regionNameKz : statItem.regionNameRu;
        }
        regionDesc = this.utilService.getRegionName(stateName, regionName);
        return [statDescription.table, statDescription.field, regionDesc].filter(Boolean).join(' / ');
    }

    downloadList() {
        let regionId;
        let districtId;
        const statDescription = this.params.statDescription;
        if (statDescription.statItem && statDescription.statItem instanceof StatItemBase) {
            regionId = statDescription.statItem.region.id;
            districtId = statDescription.statItem.region.parentId;
        } else if (statDescription.statItem) {
            regionId = statDescription.statItem.regionId;
            districtId = statDescription.statItem.regionParentId;
        }
        let requestParams: any = {id: statDescription.id, type: statDescription.type, regionId: regionId, districtId: districtId};
        if (statDescription.statItem instanceof StatItemTzhsStatus || statDescription.statItem instanceof StatItemTzhsSduStatus) {
            requestParams.categoryId = statDescription.statItem.category.id;
        }
        this.reportService.downloadStatPersonList(requestParams, "person-list.xlsx");
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.initList();
    }

    private updateDownloadPermission() {
        const id = this.params.statDescription.id || 0;
        const statType = this.params.statDescription.type;
        this.params.download = this.params.list.length > 0 &&
            (!statType.startsWith('WELFARE_STATUS_') ||
                (statType.startsWith('WELFARE_STATUS_')) && !statType.includes("EXTENDED") && [4, 5].includes(id) ||
                (statType.includes("EXTENDED") && [9, 10, 11, 12, 13, 14, 15].includes(id))
            );
    }

}



