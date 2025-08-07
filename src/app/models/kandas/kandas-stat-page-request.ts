import {PageRequest} from "../page-request";

export class KandasStatPageRequest extends PageRequest {

    public countId: number;
    public regionId: number | undefined;
    public monitorId: number;
    public monitorStatusId: number;
    public isApproved: boolean | undefined;

}
