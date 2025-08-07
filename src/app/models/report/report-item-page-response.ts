import {PageResponse} from "../page-response";
import {PersonDetailGeneral} from "../person/person-detail-general";
import {Region} from "../region";

export class ReportItemPageResponse extends PageResponse {

    public data: Array<PersonDetailGeneral> | undefined;
    public region: Region;

}
