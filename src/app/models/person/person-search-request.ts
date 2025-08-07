import {PageRequest} from "../page-request";

export class PersonSearchRequest extends PageRequest {

    public iin: string;
    public fullName: string;
    public mode: string;

}
