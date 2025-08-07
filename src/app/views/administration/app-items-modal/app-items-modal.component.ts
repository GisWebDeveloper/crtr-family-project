import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppItem} from "../../../models/administration/app-item";
import {UtilService} from "../../../services/util.service";
import {Dictionary} from "../../../models/dictionary";
import {AdministrationService} from "../../../services/administration.service";
import {AppItemsRequest} from "../../../models/administration/app-items-request";

@Component({
    selector: 'app-app-items-modal',
    templateUrl: './app-items-modal.component.html',
    styleUrls: ['./app-items-modal.component.scss']
})
export class AppItemsModalComponent implements OnInit {

    @Input() eventShowModal: EventEmitter<AppItem>;
    @Input() dictionaryAppItemTypeList: Array<Dictionary>;
    @Output() eventUpdateList: EventEmitter<boolean> = new EventEmitter<boolean>();

    // 0. MODAL
    visible = false;
    appItem: AppItem;

    constructor(
        private administrationService: AdministrationService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventShowModal.subscribe(appItem => {
            this.visible = true;
            this.appItem = appItem;
            if (this.appItem.appItemType) {
                this.appItem.appItemTypeId = this.appItem.appItemType.id;
            }
        });
    }

    save() {
        let request = new AppItemsRequest();
        request.action = this.appItem.id ? 'EDIT' : 'ADD';
        request.appItemList = [this.appItem];
        this.administrationService.crudAppItem(request).subscribe({
            next: response => {
                this.utilService.notifySuccess('Элемент приложения успешно сохранен');
                this.eventUpdateList.emit();
                this.toggleModal();
            }, error: errorResponse => {
                this.utilService.notifyError('Ошибка сохранения элемента приложения');
            }
        });
    }

    toggleModal() {
        this.visible = !this.visible;
    }

    handleModalView(event: any) {
        this.visible = event;
    }
}
