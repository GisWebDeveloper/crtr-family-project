import {HeaderCell} from "../table/header-cell";
import {NestedTableRow} from "./nested-table-row";
import {RawNestedTableRow} from "./raw-nested-table-row";

export class RawNestedTable {

    public cap: string;
    public cols: HeaderCell[];
    public rows: RawNestedTableRow[];
    public total: RawNestedTableRow[];

}
