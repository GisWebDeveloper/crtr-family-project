import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";

@Component({
    selector: 'app-segmentation-list-modal',
    templateUrl: './segmentation-list-modal.component.html',
    styleUrls: ['./segmentation-list-modal.component.scss']
})
export class SegmentationListModalComponent implements OnInit {

    @Input() eventShowListModal: EventEmitter<any>;

    // 0. MODAL
    visible = false;

    constructor(
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowListModal.subscribe(data => {
            this.visible = true;
        });
    }


    downloadList() {
        /*
        let regionId;
        const statDescription = this.params.statDescription;
        if (statDescription.statItem && statDescription.statItem instanceof StatItemTzhsStatus) {
            regionId = statDescription.statItem.region.id;
        } else if (statDescription.statItem) {
            regionId = statDescription.statItem.regionId;
        }
        let requestParams: any = {id: statDescription.id, type: statDescription.type, regionId: regionId};
        this.reportService.downloadStatPersonList(requestParams, "person-list.xlsx");*/
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }

    changePage(page: number): void {
        //this.params.pagination.currentPage = page;
        //this.initList();
    }

}
