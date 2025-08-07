export class Pagination {

    public currentPage: number;
    public itemsPerPage: number;
    public maxSize: number;
    public totalItems: number;

    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.maxSize = 7;
        this.totalItems = 0;
    }
}
