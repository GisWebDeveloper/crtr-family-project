import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TableService} from "../../services/table.service";
import {RawTable} from "../../models/table/raw-table";
import {Table} from "../../models/table/table";
import {UtilService} from "../../services/util.service";
import {TranslateService} from "@ngx-translate/core";
import {HeaderCell} from "../../models/table/header-cell";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    @Input() tableId: string;

    @Input() eventSearchStatusStat: EventEmitter<{search: string, iin: string}>;

    rawTable: RawTable;
    table: Table;
    headerCells: HeaderCell[];

    constructor(private tableService: TableService,
                private translateService: TranslateService,
                public utilService: UtilService) {
    }

    ngOnInit(): void {
        this.eventSearchStatusStat.subscribe(data => {
            this.initTable(data);
        });
    }

    private initTable(data: {search: string, iin: string}) {
        this.tableService.getTable(data.search, data.iin, this.translateService.currentLang.toUpperCase()).subscribe(
            value => {
                this.rawTable = value;
                let data = this.tableService.parseTable(this.rawTable);
                this.table = data.table;
                this.headerCells = data.cells;
            }
        );
    }

}
