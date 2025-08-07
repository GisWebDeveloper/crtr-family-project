import {Component, OnInit} from '@angular/core';
import {MonitoringService} from "../../../services/monitoring.service";
import {IncorrectDataStat} from "../../../models/monitoring/incorrect-data-stat";
import {UtilService} from "../../../services/util.service";
import {Pagination} from "../../../models/pagination";
import {DoubleIin} from "../../../models/monitoring/double-iin";
import {InvalidDocument} from "../../../models/monitoring/invalid-document";

@Component({
    selector: 'app-monitoring-incorrect-data',
    templateUrl: './monitoring-incorrect-data.component.html',
    styleUrls: ['./monitoring-incorrect-data.component.scss']
})
export class MonitoringIncorrectDataComponent implements OnInit {

    visible = [true];

    params: {
        countItem: IncorrectDataStat | undefined,
        list: any[],
        pagination: Pagination
    }

    countStatList: IncorrectDataStat[];

    constructor(public monitoringService: MonitoringService,
                public utilService: UtilService) {
        this.params = {
            countItem: undefined,
            list: new Array<any>(),
            pagination: new Pagination()
        }
    }

    ngOnInit(): void {
        this.initCountStatList();
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

    private initCountStatList() {
        this.monitoringService.getIncorrectDataStat().subscribe({
            next: response => {
                this.countStatList = response;
            },
            error: errorResponse => {
                this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
            }
        });
    }

    selectCountItem(stat: IncorrectDataStat) {
        if (stat) {
            const isSameCount = this.params.countItem && this.params.countItem.id == stat.id;
            if (!isSameCount) {
                this.params.pagination.currentPage = 1;
            }
            let filterRequest = {
                countId: stat.id,
                page: this.params.pagination.currentPage,
                size: this.params.pagination.itemsPerPage
            }
            this.params.countItem = stat;
            this.monitoringService.getStatPage(filterRequest).subscribe({
                next: response => {
                    this.params.list = response.data;
                    this.params.pagination.totalItems = response.total;
                },
                error: errorResponse => {
                    this.utilService.notifyError(this.utilService.getErrorMessage(errorResponse));
                }
            });
        }
    }

    changePage(page: number): void {
        this.params.pagination.currentPage = page;
        if (this.params.countItem) {
            this.selectCountItem(this.params.countItem)
        }
    }

}
