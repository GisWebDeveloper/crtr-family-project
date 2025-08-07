import {ActionLog} from "./action-log";
import {PageResponse} from "../page-response";

export class ActionLogResponse extends PageResponse {

    public data: Array<ActionLog>;

}
