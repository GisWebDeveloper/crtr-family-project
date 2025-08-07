import {PageResponse} from "../page-response";
import {PersonSmsDetail} from "../person/person-sms-detail";
import {Region} from "../region";

export class ReportSmsItemPageResponse extends PageResponse {

    public data: Array<PersonSmsDetail> | undefined;
    public region: Region;

}
