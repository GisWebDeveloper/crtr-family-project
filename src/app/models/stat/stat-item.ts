export class StatItem {

    //public isTotalRow: boolean;
    public level: number;
    public regionId: number;
    public regionNameKz: string;
    public regionNameRu: string;
    public regionParentId: number;
    public total: number;

    public isExpanded?: boolean;
    public isHidden?: boolean;
    public isTotal?: boolean;
    public hasChildren?: boolean;

    constructor() {
        this.total = 0;
    }

}
