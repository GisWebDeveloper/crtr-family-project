import {StatItem} from "./stat-item";

export class StatItemPopulation extends StatItem {

    public cnt1: number;
    public cnt2: number;
    public cnt3: number;
    public cnt4: number;

    constructor() {
        super();
        this.cnt1 = 0;
        this.cnt2 = 0;
        this.cnt3 = 0;
        this.cnt4 = 0;
    }
}
