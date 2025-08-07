import {Person} from "./person";
import {Document} from "./document";
import {Education} from "../common/education";
import {HR} from "../common/hr";
import {FamilyMember} from "../family/family-member";
import {Income} from "../common/income";
import {IndividualEntrepreneur} from "../common/individual-entrepreneur";
import {MedicalAttachment} from "../common/medical-attachment";
import {RealEstate} from "../common/real-estate";
import {SourceInfo} from "../common/source-info";
import {Skill} from "../common/skill";
import {LegalEntity} from "../common/legal-entity";
import {Transport} from "../common/transport";
import {AgriculturalMachinery} from "../common/agricultural-machinery";
import {FarmAnimal} from "../common/farm-animal";
import {Alimony} from "../common/alimony";
import {Employment} from "../common/employment";
import {MilitaryAction} from "../common/military-action";
import {Scholarship} from "../common/scholarship";
import {MeriIpar} from "../common/meri-ipar";
import {PersonTax} from "./person-tax";

export class PersonResponse {

    public iin: string;
    public alimonyList: Array<Alimony>;
    public dvList: Array<Transport>;
    public eduList: Array<Education>;
    public ehrList: Array<HR>;
    public familyMemberList: Array<FamilyMember>;
    public gbdflDoc: Document;
    public gblPerson: Person;
    public grstList: Array<AgriculturalMachinery>;
    public incomeList: Array<Income>;
    public ipList: Array<IndividualEntrepreneur>;
    public lphFormList: Array<FarmAnimal>;
    public medAttachmentList: Array<MedicalAttachment>;
    public nedvLandList: Array<RealEstate>;
    public nedvList: Array<RealEstate>;
    public personSourceList: Array<SourceInfo>;
    public privilegeList: Array<MilitaryAction>;
    public phone: string;
    public rtEmploymentList: Array<Employment>;
    public rtSkillsList: Array<Skill>;
    public ulList: Array<LegalEntity>;
    public scholarship: Scholarship;
    public meriIpars : Array<MeriIpar>;
    public taxes : Array<PersonTax>;
}
