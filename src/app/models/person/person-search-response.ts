import {PageResponse} from "../page-response";
import {PersonDetail} from "./person-detail";

export class PersonSearchResponse extends PageResponse {

    public data: Array<PersonDetail>;

}
