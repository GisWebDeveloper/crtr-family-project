import {PageResponse} from "../page-response";
import {PersonDetailGeneral} from "../person/person-detail-general";

export class KandasStatPageResponse extends PageResponse {

    public countId: number | undefined;
    public regionId: number | undefined;
    public personDetailList: Array<PersonDetailGeneral> | undefined;

}
