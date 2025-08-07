import {TableHeaderRow} from "./table-header-row";

export interface TableHeaderConfig {

    rows: TableHeaderRow[];
    numberFormatColumns: string[];
    colorDataColumn?: string[];
    showModalColumns?: string[];

}
