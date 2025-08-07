import {StatItem} from "./stat-item";

export class StatItemFamilyType extends StatItem {

    public cnt1: number;
    public cnt2: number;
    public cnt3: number;
    public cnt4: number;
    public cnt5: number;
    public cnt8: number;
    public cnt10: number;

    constructor() {
        super();
        this.cnt1 = 0;
        this.cnt2 = 0;
        this.cnt3 = 0;
        this.cnt4 = 0;
        this.cnt5 = 0;
        this.cnt8 = 0;
        this.cnt10 = 0;
    }
}
