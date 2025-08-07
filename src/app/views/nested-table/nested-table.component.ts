import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {HeaderCell} from "../../models/table/header-cell";
import {TableService} from "../../services/table.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../services/util.service";
import {RawNestedTable} from "../../models/nested-table/raw-nested-table";
import {NestedTable} from "../../models/nested-table/nested-table";

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.scss']
})
export class NestedTableComponent implements OnInit {

    @Input() tableName: string;

    @Input() eventSearchStatusStat: EventEmitter<{search: string, iin: string}>;

    rawTable: RawNestedTable | undefined;
    table: NestedTable | undefined;
    headerCells: HeaderCell[] | undefined;
    selectedRowIndex: number | undefined;

    constructor(private tableService: TableService,
                private translateService: TranslateService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventSearchStatusStat.subscribe(data => {
            this.selectedRowIndex = undefined;
            this.rawTable = undefined;
            this.table = undefined;
            this.headerCells = undefined;
            this.initTable(data);
        });
    }

    private initTable(data: {search: string, iin: string}) {
        this.tableService.getTableNested(data.search, data.iin, this.translateService.currentLang.toUpperCase()).subscribe({
            next: value => {
                this.rawTable = value;
                let data = this.tableService.parseNestedTable(this.rawTable);
                this.table = data.table;
                this.headerCells = data.cells;
            }, error: errorResponse => {
                this.utilService.notifyError(errorResponse);
            }
        });
    }

    setSelectedRowIndex(idx: number) {
        this.selectedRowIndex = this.selectedRowIndex !== idx ? idx : undefined;
    }
}
