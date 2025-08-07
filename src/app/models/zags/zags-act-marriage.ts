import {ZagsAct} from "./zags-act";

export class ZagsActMarriage extends ZagsAct {

    public deathActDate: string;
    public deathActNumber: string;
    public divorceActDate: string;
    public divorceActNumber: string;
    public divorceCourtActDate: string;
    public divorceCourtActNumber: string;
    public manFullName: string;
    public manIin: string;
    public womanFullName: string;
    public womanIin: string;

    public spouseIin?: string;
    public spouseFullName?: string;

}
