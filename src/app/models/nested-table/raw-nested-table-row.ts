export class RawNestedTableRow {
    public level: number;
    public values: (number | string)[];
    public subRows: RawNestedTableRow[];
}
