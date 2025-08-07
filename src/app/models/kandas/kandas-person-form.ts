import {FamilyMember} from "../family/family-member";
import {KandasCks} from "./kandas-cks";

export class KandasPersonForm {

    public fullName: string;
    public address: string;
    public phone: string;
    public familyType: string;

    public familyMemberList: FamilyMember[];
    public kandasCksList: KandasCks[];

    public organization: string;
    public executor: string;
    public taskCreateDate: string;

}
