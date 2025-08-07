import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {AdministrationService} from "../../../services/administration.service";
import {Role} from "../../../models/role";
import {RoleAppItem} from "../../../models/administration/role-app-item";
import {AppItem} from "../../../models/administration/app-item";
import {TranslateService} from "@ngx-translate/core";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import * as Notiflix from 'notiflix';
import {AppItemsRequest} from "../../../models/administration/app-items-request";

@Component({
    selector: 'app-administration-app-items',
    templateUrl: './administration-app-items.component.html',
    styleUrls: ['./administration-app-items.component.scss']
})
export class AdministrationAppItemsComponent implements OnInit {

    @Output() eventShowModal: EventEmitter<AppItem> = new EventEmitter<AppItem>();

    appItemList: Array<AppItem> = [];
    dictionaryAppItemTypeList: Array<Dictionary> = [];
    roleAppItemList: Array<RoleAppItem> = [];
    roleList: Array<Role> = [];
    selectedRole: Role | undefined = undefined;

    constructor(
        private administrationService: AdministrationService,
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.initAppItemList();
        this.dictionaryService.getDictionaryAppItemType().subscribe(response => {
            this.dictionaryAppItemTypeList = response;
        });
    }

    initAppItemList() {
        this.administrationService.getAppItemList().subscribe({
            next: response => {
                this.appItemList = response.appItemList;
                this.roleList = response.roleList;
                this.roleAppItemList = response.roleItemList;
            }, error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    selectRole(role: Role) {
        this.selectedRole = role;
        let selectedRoleItemList: Array<RoleAppItem> = [];
        if (this.selectedRole && this.roleAppItemList && this.roleAppItemList.length > 0) { // @ts-ignore
            selectedRoleItemList = this.roleAppItemList.filter(item => item.roleId == this.selectedRole.roleId);
        }
        this.appItemList.forEach(appItem => {
            appItem.checked = selectedRoleItemList.some(item => item.appItemId === appItem.id);
        });
    }

    showAppItemModal(appItem?: AppItem) {
        this.eventShowModal.emit(appItem ? appItem : new AppItem());
    }

    saveAppItemList() {
        if (this.selectedRole) {
            let request = new AppItemsRequest();
            request.roleList = [this.selectedRole];
            request.appItemList = [];
            request.appItemList = this.appItemList.filter(item => item.checked).map(item => item);
            this.administrationService.assignAppItem(request).subscribe({
                next: response => {
                    this.roleAppItemList = response.roleItemList;
                    // @ts-ignore
                    this.utilService.notifySuccess('Элементы приложения успешно назначены для роли - ' + this.selectedRole.code + ' / ' + this.selectedRole?.nameRu);

                }, error: errorResponse => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
                }
            });
        }
    }

    deleteAppItem(appItem: AppItem) {

        let itemName = this.translateService.currentLang === 'kz' ? appItem.appItemType.nameKz : appItem.appItemType.nameRu;
        itemName = itemName + '. ' + appItem.nameRu
        Notiflix.Confirm.show(
            this.utilService.getTranslationValue('administration-page.confirmation'),
            this.utilService.getTranslationValue('administration-page.app-items.confirm-delete', {
                code: appItem.code,
                name: itemName
            }),
            this.utilService.getTranslationValue('yes'),
            this.utilService.getTranslationValue('no'),
            () => {
                let request = new AppItemsRequest();
                request.action = 'DELETE';
                request.appItemList = [appItem];
                this.administrationService.crudAppItem(request).subscribe({
                    next: response => {
                        this.selectedRole = undefined;
                        this.initAppItemList();
                        this.utilService.notifySuccess('Элемент приложения "' + appItem.code + '" успешно удален');

                    }, error: errorResponse => {
                        this.utilService.notifyError('Ошибка удаления элемента приложения');
                    }
                });
            },
            () => {

            },
            {
                width: '500px',
                borderRadius: '10px'
            });
    }

}
