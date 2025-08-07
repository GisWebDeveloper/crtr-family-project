import {ZagsActBirth} from "./zags-act-birth";
import {ZagsActDivorce} from "./zags-act-divorce";
import {ZagsActMarriage} from "./zags-act-marriage";

export class ZagsInfo {

    public birthList: Array<ZagsActBirth>;
    public divorceList: Array<ZagsActDivorce>;
    public hasData: boolean;
    public marriageList: Array<ZagsActMarriage>;
    public parents: ZagsActBirth;

}
