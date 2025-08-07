import {BaseRequest} from "../base-request";
import {CountMember} from "./count-member";

export class CountRequest extends BaseRequest {

    public countCode: string;

    public countMemberList?: Array<CountMember>;

}
