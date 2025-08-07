import {PageRequest} from "../page-request";

export class ReportItemPageRequest extends PageRequest {

    public id: number | undefined;
    public countId: number | undefined;
    public countCode: string | undefined;
    public regionId: number | undefined;
    public type: string | undefined;
    public year: number | undefined;
    public col: number | undefined;
    public date: string | undefined
    public nameId: number | undefined

}
