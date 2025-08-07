import {Dictionary} from "../dictionary";
import {Region} from "../region";

export class KandasModalDescription {

    public monitorId: number;
    public monitorName: string;
    public count: Dictionary;
    public region: Region;
    public monitorStatusId: number;
    public isApproved: boolean | undefined;

}
