import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {RawTable} from "../models/table/raw-table";
import {Table} from "../models/table/table";
import {HeaderCell} from "../models/table/header-cell";
import {NestedTable} from "../models/nested-table/nested-table";
import {RawNestedTable} from "../models/nested-table/raw-nested-table";
import {NestedTableRow} from "../models/nested-table/nested-table-row";
import {RawNestedTableRow} from "../models/nested-table/raw-nested-table-row";

@Injectable({
    providedIn: 'root'
})
export class TableService {

    constructor(private httpService: HttpService) {
    }

    public getTable(tableName: string, iin: string, language?: string): Observable<RawTable> {
        return this.httpService.post('/table/getTable', {tableName: tableName, iin: iin,lang: language});
    }

    public getTableNested(tableName: string, iin: string, language?: string): Observable<RawNestedTable> {
        return this.httpService.post('/table/getTable', {tableName: tableName, iin: iin,lang: language});
    }

    public parseTable(rawTable: RawTable): { table: Table, cells: HeaderCell[] } {
        this.setColAdnRowSpans(rawTable.cols);

        let table: Table = new Table();

        table.cap = rawTable.cap;
        table.rows = [];
        rawTable.rows.forEach(row => {
            table.rows.push(row.map(cell => cell != null ? String(cell) : ''));
        });
        table.total = rawTable.total.map(cell => cell != null ? String(cell) : '');
        table.headerRows = [];

        this.parseTableHeader(rawTable.cols, table);


        let cells: HeaderCell[] = [];
        this.getHeaderCells(rawTable.cols, cells);

        return {table: table, cells: cells};
    }

    private parseTableHeader(cols: HeaderCell[], table: Table | NestedTable) {
        let queue: HeaderCell[] = [];
        queue = queue.concat(cols);

        while (queue.length > 0) {
            let n = queue.length;

            let headerRow: HeaderCell[] = [];
            for (let i = 0; i < n; i++) {
                let rawHeader = queue.shift();

                if (rawHeader) {
                    headerRow.push(rawHeader);
                }
                if (rawHeader?.cols) {
                    queue = queue.concat(rawHeader.cols);
                }
            }

            table.headerRows.push(headerRow);
        }
    }

    private setColAdnRowSpans(cols: HeaderCell[]) {
        let childCols: HeaderCell[] = [];

        cols.forEach(col => {
            if (col.cols) {
                childCols = childCols.concat(col.cols);
            }
        });
        if (childCols.length > 0) {
            this.setColAdnRowSpans(childCols);
        }

        if (childCols.length == 0) {
            cols.forEach(col => {
                col.level = 1;
                col.colspan = 1;
                col.rowspan = 1;
            });
        } else {
            let level: number = 1;
            cols.forEach(col => {
                if (col.cols) {
                    level = col.cols[0].level + 1;
                }
            });

            for (let i = 0; i < cols.length; i++) {
                cols[i].level = level;
                if (cols[i].cols) {
                    let colspan = 0;
                    cols[i].cols?.forEach(childCols => {
                            colspan += childCols.colspan;
                        }
                    );

                    cols[i].rowspan = 1;
                    cols[i].colspan = colspan;
                } else {
                    cols[i].rowspan = level;
                    cols[i].colspan = 1;
                }
            }
        }

    }

    private getHeaderCells(headerCells: HeaderCell[], cells: HeaderCell[]) {
        headerCells.forEach(cell => {
            if (cell.cols) {
                this.getHeaderCells(cell.cols, cells);
            } else {
                cells.push(cell);
            }
        });
    }

    public parseNestedTable(rawTable: RawNestedTable) {
        this.setColAdnRowSpans(rawTable.cols);

        let table: NestedTable = new NestedTable();

        table.cap = rawTable.cap;
        table.rows = this.setNestedRows(rawTable.rows);
        table.total = this.setNestedRows(rawTable.total);
        table.headerRows = [];

        this.parseTableHeader(rawTable.cols, table);


        let cells: HeaderCell[] = [];
        this.getHeaderCells(rawTable.cols, cells);

        return {table: table, cells: cells};
    }

    private setNestedRows(rows: RawNestedTableRow[]): NestedTableRow[] {
        let tableRows: NestedTableRow[] = [];
        rows.forEach(row => {
            let newRow = new NestedTableRow();
            newRow.level = row.level;
            newRow.values = row.values.map(cell => cell != null ? String(cell) : '');
            if (row.subRows) {
                newRow.subRows = this.setNestedRows(row.subRows)
            }
            tableRows.push(newRow);
        });

        return  tableRows;
    }
}
