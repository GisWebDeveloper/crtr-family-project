import {Family} from "./family";
import {FamilyMember} from "./family-member";
import {FamilyStatusInfo} from "./family-status-info";
import {FamilyLphInfo} from "./family-lph-info";
import {FamilyCategoryHistory} from "./family-category-history";

export class FamilyResponse {

    public addressRu: string;
    public addressKz: string;
    public factAddress: string;
    public family: Family;
    public familyId: number;
    public familyLphList: Array<FamilyLphInfo>;
    public familyMemberList: Array<FamilyMember>;
    public familyStatusList: Array<FamilyStatusInfo>;
    public familyCategoryHistory: Array<FamilyCategoryHistory>;
    public iin: string;

}
