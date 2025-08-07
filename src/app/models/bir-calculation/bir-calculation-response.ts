import {Organization} from "./organization";

export class BirCalculationResponse {
    public inIIN: string;
    public in_DateInp: string;
    public in_RiskDate: string;
    public in_Pe: string;
    public requestDate: string;
    public responseDate: string;
    public mrzp: string
    public countMonths: number;
    public ksu: number;
    public kzd: number;
    public sumAllAvg: string;
    public sumAvg: string;
    public sumPay: string;

    public organizations: Organization[];
}
