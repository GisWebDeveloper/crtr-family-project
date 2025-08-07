import {Component, OnInit} from '@angular/core';
import {UtilService} from "../../services/util.service";
import {StatusService} from "../../services/status.service";
import {TranslateService} from "@ngx-translate/core";
import {Dictionary} from "../../models/dictionary";
import {StatusStatRequest} from "../../models/status/status-stat-request";
import {StatusStat} from "../../models/status/status-stat";
import {Pagination} from "../../models/pagination";
import {StatusPageRequest} from "../../models/status/status-page-request";
import {AuthService} from "../../services/auth.service";
import * as FileSaver from 'file-saver';
import {ReportService} from "../../services/report.service";
import {PersonDetail} from "../../models/person/person-detail";
import {UserRoleService} from "../../services/user-role.service";
import {Permissions} from "../../models/administration/permissions";

@Component({
    selector: 'app-social-statuses',
    templateUrl: './social-statuses.component.html',
    styleUrls: ['./social-statuses.component.scss']
})
export class SocialStatusesComponent implements OnInit {

    // filter, status list, person list
    visible = [true, true, true];

    categoryList: Array<StatusStat>;
    filterStatusId: number | null;
    statusDictionaryList: Array<Dictionary>;
    statusList: Array<StatusStat>;
    permissions = Permissions.PERMISSIONS;

    params: {
        categoryId: number | null,
        list: Array<PersonDetail>,
        name: string,
        pagination: Pagination,
        statusId: number | null
    }

    constructor(private authService: AuthService,
                private reportService: ReportService,
                private statusService: StatusService,
                public translateService: TranslateService,
                public utilService: UtilService,
                private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.filterStatusId = null;
        this.categoryList = new Array<StatusStat>();
        this.statusList = new Array<StatusStat>();
        this.params = {
            categoryId: null,
            list: new Array<PersonDetail>(),
            name: '',
            pagination: new Pagination(),
            statusId: null
        }
        this.initStatusDictionaryList();
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

    initStatusDictionaryList() {
        this.statusService.getStatusDictionaryList().subscribe({
            next: response => {
                this.statusDictionaryList = response;
                this.search();
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    search() {
        let request = new StatusStatRequest();
        request.statusId = this.filterStatusId;
        this.statusService.getStatusStat(request).subscribe({
            next: response => {
                this.categoryList = response.filter(item => item.categoryId);
                this.statusList = response.filter(item => !item.categoryId);
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    selectStatusItem(statusId: number | null, categoryId: number | null, name: string) {
        this.params.pagination.currentPage = (this.params.statusId != statusId || this.params.categoryId != categoryId) ? 1 : this.params.pagination.currentPage;
        this.params.statusId = statusId;
        this.params.categoryId = categoryId;
        this.params.name = name;

        let request = new StatusPageRequest()
        request.statusId = this.params.statusId;
        request.categoryId = this.params.categoryId;
        request.page = this.params.pagination.currentPage;
        request.size = this.params.pagination.itemsPerPage;
        this.statusService.getStatusStatPage(request).subscribe({
            next: response => {
                this.params.list = response.personDetailList;
                this.params.pagination.totalItems = response.total;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        this.selectStatusItem(this.params.statusId, this.params.categoryId, this.params.name);
    }

    downloadReport() {
        let requestParams: any = {
            userId: this.authService.getUserId()
        };
        if (this.params.statusId) {
            requestParams.statusId = this.params.statusId;
        }
        if (this.params.categoryId) {
            requestParams.categoryId = this.params.categoryId;
        }
        // //@ts-ignore
        // FileSaver.saveAs(this.reportService.downloadStatusPersonListUrl(requestParams), "person-list.xlsx");
        this.reportService.downloadStatusPersonListUrl(requestParams, "person-list.xlsx");
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
