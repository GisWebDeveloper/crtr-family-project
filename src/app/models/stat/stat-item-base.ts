import {Region} from "../region";

export class StatItemBase {

    public region: Region;
    public stateRegion: Region;
    public familyCountTotal: number;
    public personCountTotal: number;

    public isTotal?: boolean;
    public isHidden?: boolean;
    public level?: number;

}
