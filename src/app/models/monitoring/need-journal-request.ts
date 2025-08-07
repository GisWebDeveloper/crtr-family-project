import {PageRequest} from "../page-request";

export class NeedJournalRequest extends PageRequest {

    public countCode: string | undefined;
    public iin: string | undefined;
    public statusCode: string | undefined;
    public type: string | undefined;

}
