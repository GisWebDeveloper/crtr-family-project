import {PageResponse} from "../page-response";

export class SegmentationNewFilter extends PageResponse {
    public districtId: number | null;
    public regionId: number | null;
    public famSdd: number[] | null;
    public famCredit: number | null;
    public famCreditZ: number[] | null;
    public famDvTran: number[] | null;
    public famDvTranCom: number | null;
    public famNedvCom: number | null;
    public famEmp: number[] | null;
    public famUl: number[] | null;
    public famMed: number | null;
    public famOsms: number | null;
    public famDiseaseB: number | null;
    public famDiseaseD: number | null;
    public famEduS: number[] | null;
    public famEduSh: number[] | null;
    public famDvGrst: number[] | null;
    public famNedvLand: number[] | null;
    public famLph: number[] | null;
    public famNedv: number[] | null;
    public famAdr: number[] | null;
    public famChild: number[] | null;
    public famInv1: number | null;
    public famInv3: number | null;
    public famInvChild: number | null;
    public famAsp: number[] | null;
    public famType: number | null;

    public familyTzhsGroup: any | null = null;
}
