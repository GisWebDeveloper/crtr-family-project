import {PersonDetail} from "../person/person-detail";

export class StatusPageResponse {

    public categoryId: number | null;
    public personDetailList: Array<PersonDetail>;
    public statusId: number | null;
    public total: number;

}
