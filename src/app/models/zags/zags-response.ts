import {ZagsActDivorce} from "./zags-act-divorce";
import {ZagsActMarriage} from "./zags-act-marriage";
import {ZagsActBirth} from "./zags-act-birth";

export class ZagsResponse {

    public iin: string;
    public birthList: Array<ZagsActBirth>;
    public divorceList: Array<ZagsActDivorce>;
    public marriageList: Array<ZagsActMarriage>;
    public parents: ZagsActBirth;

}
