import {PageRequest} from "../page-request";

export class WelfareRequest extends PageRequest {

    public id: number | undefined;
    public month: number | undefined;
    public regionId: number | undefined;
    public year: number | undefined;

}
