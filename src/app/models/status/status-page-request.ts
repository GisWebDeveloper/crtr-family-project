import {PageRequest} from "../page-request";

export class StatusPageRequest extends PageRequest {

    public categoryId: number | null;
    public statusId: number | null;
}
