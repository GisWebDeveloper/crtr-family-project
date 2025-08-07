import {StatItem} from "./stat-item";

export class StatItemASP extends StatItem {

    public cntAsp: number;
    public cntNotAsp: number;


    constructor() {
        super();
        this.cntAsp = 0;
        this.cntNotAsp = 0;
    }
}
