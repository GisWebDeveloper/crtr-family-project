import {PageResponse} from "../page-response";
import {JournalMember} from "./journal-member";

export class NeedJournalResponse extends PageResponse {

    public needActionsJournalList: Array<JournalMember> | undefined;

}
