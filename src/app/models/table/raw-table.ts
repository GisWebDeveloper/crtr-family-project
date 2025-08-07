import {HeaderCell} from "./header-cell";

export class RawTable {

    public cap: string;
    public cols: HeaderCell[];
    public rows: Array<Array<number | string>>;
    public total: (number | string)[];

}
