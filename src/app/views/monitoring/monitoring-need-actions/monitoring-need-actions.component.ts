import {Component, OnInit} from '@angular/core';
import {MonitoringService} from "../../../services/monitoring.service";
import {NeedJournalRequest} from "../../../models/monitoring/need-journal-request";
import {Pagination} from "../../../models/pagination";
import {JournalMember} from "../../../models/monitoring/journal-member";
import {DictionaryService} from "../../../services/dictionary.service";
import {Dictionary} from "../../../models/dictionary";
import {WorkspaceService} from "../../../services/workspace.service";
import {UtilService} from "../../../services/util.service";
import {CountNeedActionsStatItem} from "../../../models/count-need-actions-stat-item";
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-monitoring-need-actions',
    templateUrl: './monitoring-need-actions.component.html',
    styleUrls: ['./monitoring-need-actions.component.scss']
})
export class MonitoringNeedActionsComponent implements OnInit {

    // 0. STAT // 1. FILTER
    visible = [true, true];

    dictionaryCount: Array<Dictionary> = [];
    dictionaryStatus: Array<Dictionary> = [];
    params: {
        countCode: string,
        iin: string,
        formSubmitted: boolean,
        list: Array<JournalMember>,
        pagination: Pagination,
        statusCode: string
    }
    permissions = Permissions.PERMISSIONS;

    countStatList: Array<CountNeedActionsStatItem>;
    countStatTotal: CountNeedActionsStatItem = new CountNeedActionsStatItem();

    constructor(
        private dictionaryService: DictionaryService,
        private monitoringService: MonitoringService,
        public utilService: UtilService,
        private workspaceService: WorkspaceService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.countStatList = new Array<CountNeedActionsStatItem>();
        this.params = {
            countCode: '', iin: '', formSubmitted: false, list: [], pagination: new Pagination(), statusCode: ''
        }
        this.initDictionaries();
        this.initCountStatList();
    }

    initDictionaries() {
        this.dictionaryService.getDictionaryCount('S05').subscribe({
            next: response => {
                this.dictionaryCount = response;
            }, error: errorResponse => {
                this.utilService.displayError(errorResponse);
            }
        });
        this.dictionaryService.getDictionaryNeedActionStatus().subscribe({
            next: response => {
                this.dictionaryStatus = response;
            }, error: reportError => {
                this.utilService.displayError(reportError);
            }
        });
    }

    initCountStatList() {
        this.workspaceService.getStatNeedActions({countCode: 'S05'}).subscribe({
            next: response => {
                this.countStatList = response;
                this.countStatTotal.count1 = this.utilService.getArrayFieldSum(this.countStatList, 'count1');
                this.countStatTotal.count2 = this.utilService.getArrayFieldSum(this.countStatList, 'count2');
                this.countStatTotal.count3 = this.utilService.getArrayFieldSum(this.countStatList, 'count3');
                this.countStatTotal.count4 = this.utilService.getArrayFieldSum(this.countStatList, 'count4');
                this.countStatTotal.count5 = this.utilService.getArrayFieldSum(this.countStatList, 'count5');
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    initJournalList() {
        if (this.params.countCode) {
            let request = new NeedJournalRequest();
            request.iin = this.params.iin;
            request.countCode = this.params.countCode;
            request.statusCode = this.params.statusCode;
            request.page = this.params.pagination.currentPage;
            request.size = this.params.pagination.itemsPerPage;
            this.monitoringService.getNeedJournalList(request).subscribe({
                next: response => {
                    this.params.formSubmitted = true;
                    if (response.needActionsJournalList) this.params.list = response.needActionsJournalList;
                    this.params.pagination.totalItems = response.total;
                }, error: errorResponse => {
                    this.utilService.displayError(errorResponse);
                }
            });
        }
    }

    search() {
        this.initJournalList();
    }

    changePage(page: number): void {
        if (this.params.pagination.currentPage != page) {
            this.params.pagination.currentPage = page;
            this.initJournalList();
        }
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
