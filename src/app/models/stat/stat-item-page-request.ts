import {PageRequest} from "../page-request";

export class StatItemPageRequest extends PageRequest {

    public id: number | undefined;
    public categoryId: number | undefined;
    public countId: number | undefined;
    public districtId: number | undefined;
    public regionId: number | undefined;
    public statusId: number | undefined;
    public type: string | undefined;

}
