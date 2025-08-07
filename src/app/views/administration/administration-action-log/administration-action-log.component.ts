import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {AdministrationService} from "../../../services/administration.service";
import {ActionLogRequest} from "../../../models/administration/action-log-request";
import {Pagination} from "../../../models/pagination";
import {ActionLog} from "../../../models/administration/action-log";
import {Dictionary} from "../../../models/dictionary";
import {DictionaryService} from "../../../services/dictionary.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-administration-action-log',
    templateUrl: './administration-action-log.component.html',
    styleUrls: ['./administration-action-log.component.scss']
})
export class AdministrationActionLogComponent implements OnInit {

    visible = [true];

    actionLogList: Array<ActionLog>;
    pagination: Pagination;
    filter: {
        actionCode: string,
        actionDictionary: Array<Dictionary>;
        searchKey: string
    };

    constructor(
        private administrationService: AdministrationService,
        private dictionaryService: DictionaryService,
        public translateService: TranslateService,
        public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.actionLogList = [];
        this.pagination = new Pagination();
        this.pagination.itemsPerPage = 20;

        this.filter = {
            actionCode: '',
            actionDictionary: this.dictionaryService.getDictionaryActionCodes(),
            searchKey: ''
        }

        this.initActionLogList();
    }

    initActionLogList() {
        let request: ActionLogRequest = new ActionLogRequest();
        request.actionCode = this.filter.actionCode;
        request.searchKey = this.filter.searchKey;
        request.page = this.pagination.currentPage;
        request.size = this.pagination.itemsPerPage;
        this.administrationService.getActionLog(request).subscribe({
            next: response => {
                this.actionLogList = response.data;
                this.pagination.totalItems = response.total;
            }, error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    changePage(page: number): void {
        this.pagination.currentPage = page;
        this.initActionLogList();
    }

    getActionName(log: ActionLog): string {
        let action = log.action, translateKey = '';
        if (log.action == 'AUTHORIZATION') {
            translateKey = 'administration-page.action-log.action-desc.authorization';
        } else if (log.action == 'DOWNLOAD') {
            if (log.oldValue.toUpperCase().indexOf('LIST')) {
                translateKey = 'administration-page.action-log.action-desc.download';
            } else {
                translateKey = 'administration-page.action-log.action-desc.download-list';
            }
        } else if (log.action == 'SEARCH') {
            if (log.oldValue == 'IIN') {
                translateKey = 'administration-page.action-log.action-desc.search-by-iin';
            } else if (log.oldValue == 'PHONE') {
                translateKey = 'administration-page.action-log.action-desc.search-phone';
            } else {
                translateKey = 'administration-page.action-log.action-desc.search-by-full-name';
            }
        } else if (log.action == 'REPORT') {
            translateKey = 'administration-page.action-log.action-desc.report';
        } else if (log.action == 'VIEW_PERSON') {
            translateKey = 'administration-page.action-log.action-desc.view-person';
        }
        if (translateKey) action = this.utilService.getTranslationValue(translateKey)
        return action;
    }

    getDescription(log: ActionLog): string {
        let description = '';
        if (log.action == 'AUTHORIZATION') {
            description = '';
        } else if (log.action == 'DOWNLOAD') {
            description = '';
            let descList = log.description.split(';');
            descList.forEach(item => {
                let itemMap = item.split('=');
                if (itemMap[0]) description = description + itemMap[0] + ' - ' + itemMap[1] + '<br>';

            });
        } else if (log.action == 'SEARCH') {
            if (['IIN', 'PHONE'].includes(log.oldValue)) {
                description = this.utilService.getTranslationValue('administration-page.action-log.iin', {iin: log.newValue});
            } else {
                description = log.description;
            }
        } else if (log.action == 'VIEW_PERSON') {
            description = this.utilService.getTranslationValue('administration-page.action-log.iin', {iin: log.newValue});
        } else if (log.action == 'REPORT') {
            if (log.oldValue == 'FAMILY_PORTRAIT_PDF') {
                description = this.utilService.getTranslationValue('administration-page.action-log.report-family-portrait', {iin: log.newValue});
            } else if (log.oldValue == 'PERSON_PORTRAIT_PDF') {
                description = this.utilService.getTranslationValue('administration-page.action-log.report-person-portrait', {iin: log.newValue});
            }
        }
        return description;
    }

    getUserName(log: ActionLog): string {
        return this.utilService.concat(': ', log.userLogin, this.utilService.getCapitalized(log.userName));
    }

}
