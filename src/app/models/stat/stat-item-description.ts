import {StatItem} from "./stat-item";
import {StatItemBase} from "./stat-item-base";

export class StatItemDescription {

    public field: string;
    public id: number | undefined;
    public statItem: StatItem | StatItemBase | undefined;
    public table: string;
    public type: string;

}
