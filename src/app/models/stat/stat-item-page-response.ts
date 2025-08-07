import {PageResponse} from "../page-response";
import {StatItemMember} from "./stat-item-member";

export class StatItemPageResponse extends PageResponse {

    public countId: number | undefined;
    public regionId: number | undefined;
    public personDetailList: Array<StatItemMember> | undefined;
    public sth: number;

}
