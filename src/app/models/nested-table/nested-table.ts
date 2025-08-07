import {HeaderCell} from "../table/header-cell";
import {NestedTableRow} from "./nested-table-row";

export class NestedTable {

    public cap: string;
    public headerRows: HeaderCell[][];
    public rows: NestedTableRow[];
    public total: NestedTableRow[];

}
