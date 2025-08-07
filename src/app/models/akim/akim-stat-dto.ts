import {AkimStat} from "./akim-stat";

export class AkimStatDto {
    current: AkimStat;
    cntMemPercentage: number = 0;
    sddOpvPercentage: number = 0;
    zuPercentage: number = 0;
    opvPercentage: number = 0;
}
