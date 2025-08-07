import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonService} from "../../../services/person.service";
import {BaseRequest} from "../../../models/base-request";
import {PersonResponse} from "../../../models/person/person-response";
import {UserRoleService} from "../../../services/user-role.service";
import {Education} from "../../../models/common/education";
import {HR} from "../../../models/common/hr";
import {Income} from "../../../models/common/income";
import {IndividualEntrepreneur} from "../../../models/common/individual-entrepreneur";
import {LegalEntity} from "../../../models/common/legal-entity";
import {MedicalAttachment} from "../../../models/common/medical-attachment";
import {Skill} from "../../../models/common/skill";
import {SourceInfo} from "../../../models/common/source-info";
import {RealEstate} from "../../../models/common/real-estate";
import {Transport} from "../../../models/common/transport";
import {AgriculturalMachinery} from "../../../models/common/agricultural-machinery";
import {FarmAnimal} from "../../../models/common/farm-animal";
import {Alimony} from "../../../models/common/alimony";
import {Employment} from "../../../models/common/employment";
import {MilitaryAction} from "../../../models/common/military-action";
import {GovernmentMeasure} from "../../../models/common/gov-measure";
import {PersonInfo} from "../../../models/person/person-info";
import {UtilService} from "../../../services/util.service";
import {DataService} from "../../../services/data.service";
import {Scholarship} from "../../../models/common/scholarship";
import {MeriIpar} from "../../../models/common/meri-ipar";
import {PersonTax} from "../../../models/person/person-tax";

@Component({
    selector: 'app-person-portrait',
    templateUrl: './person-portrait.component.html',
    styleUrls: ['./person-portrait.component.scss']
})
export class PersonPortraitComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showPersonPortrait: EventEmitter<string>;

    @Output() eventShowAgriculturalMachinery: EventEmitter<Array<AgriculturalMachinery>> = new EventEmitter();
    @Output() eventShowAlimony: EventEmitter<Array<Alimony>> = new EventEmitter();
    @Output() eventShowEducation: EventEmitter<Array<Education>> = new EventEmitter();
    @Output() eventShowEmployment: EventEmitter<Array<Employment>> = new EventEmitter();
    @Output() eventShowFarmAnimal: EventEmitter<Array<FarmAnimal>> = new EventEmitter();
    @Output() eventShowGeneralInfo: EventEmitter<PersonInfo> = new EventEmitter();
    @Output() eventShowGovMeasure: EventEmitter<Array<GovernmentMeasure>> = new EventEmitter();
    @Output() eventShowHR: EventEmitter<Array<HR>> = new EventEmitter();
    @Output() eventShowIncome: EventEmitter<Array<Income>> = new EventEmitter();
    @Output() eventShowIndividualEntrepreneur: EventEmitter<Array<IndividualEntrepreneur>> = new EventEmitter();
    @Output() eventShowLand: EventEmitter<Array<RealEstate>> = new EventEmitter();
    @Output() eventShowLegalEntity: EventEmitter<Array<LegalEntity>> = new EventEmitter();
    @Output() eventShowMedicalAttachment: EventEmitter<Array<MedicalAttachment>> = new EventEmitter();
    @Output() eventShowMilitaryActions: EventEmitter<Array<MilitaryAction>> = new EventEmitter();
    @Output() eventShowRealEstate: EventEmitter<Array<RealEstate>> = new EventEmitter();
    @Output() eventShowSkill: EventEmitter<Array<Skill>> = new EventEmitter();
    @Output() eventShowSocialPayment: EventEmitter<Array<SourceInfo>> = new EventEmitter();
    @Output() eventShowSocialStatus: EventEmitter<Array<SourceInfo>> = new EventEmitter();
    @Output() eventShowTransport: EventEmitter<Array<Transport>> = new EventEmitter();
    @Output() eventShowScholarship: EventEmitter<Scholarship> = new EventEmitter();
    @Output() eventShowMeriIpar: EventEmitter<Array<MeriIpar>> = new EventEmitter();
    @Output() eventShowTax: EventEmitter<Array<PersonTax>> = new EventEmitter();

    // person portrait
    visible = [true];

    hasAdminPermissions: boolean = false;
    personGovMeasureList: Array<GovernmentMeasure>;
    personResponse: PersonResponse;

    constructor(public personService: PersonService,
                private userRoleService: UserRoleService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        this.hasAdminPermissions = this.userRoleService.hasRole('CKS_ADMIN');
        this.showPersonPortrait.asObservable().subscribe(iinValue => {
            this.getPersonInfo(iinValue);
        });
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];

        // Rerender child components
        if (id === 0 && this.visible[id]) {
            setTimeout(() => {
                this.emitEvents(this.personResponse.gblPerson.iin, this.personResponse, true);
            }, DataService.EVENT_DELAY);
        }
    }

    private getPersonInfo(iin: string) {
        let personRequest = new BaseRequest();
        personRequest.iin = iin;
        this.personService.getPersonInfo(personRequest).subscribe({
            next: personResponse => {
                this.personResponse = personResponse;
                this.emitEvents(iin, this.personResponse);

            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });
    }

    private emitEvents(iin: string, personResponse: PersonResponse, isToggle?: boolean) {

        let personInfo = new PersonInfo();
        personInfo.document = personResponse.gbdflDoc;
        personInfo.person = personResponse.gblPerson;
        personInfo.personPhoneNumber = personResponse.phone;
        if (personResponse.familyMemberList) {
            const familyMember = personResponse.familyMemberList.find(fm => fm.iin === iin);
            if (familyMember) {
                personInfo.factAddress = familyMember.factAddress;
                personInfo.attrDictionary = familyMember.familyAttrDictionary;
            }
        }

        this.eventShowGeneralInfo.emit(personInfo);
        this.eventShowAgriculturalMachinery.emit(personResponse.grstList);
        this.eventShowAlimony.emit(personResponse.alimonyList);
        this.eventShowEducation.emit(personResponse.eduList);
        this.eventShowEmployment.emit(personResponse.rtEmploymentList);
        this.eventShowFarmAnimal.emit(personResponse.lphFormList);
        this.eventShowHR.emit(personResponse.ehrList);
        this.eventShowIncome.emit(personResponse.incomeList);
        this.eventShowIndividualEntrepreneur.emit(personResponse.ipList);
        this.eventShowLand.emit(personResponse.nedvLandList);
        this.eventShowLegalEntity.emit(personResponse.ulList);
        this.eventShowMedicalAttachment.emit(personResponse.medAttachmentList);
        this.eventShowMilitaryActions.emit(personResponse.privilegeList);
        this.eventShowRealEstate.emit(personResponse.nedvList);
        this.eventShowSkill.emit(personResponse.rtSkillsList);
        this.eventShowSocialPayment.emit(personResponse.personSourceList);
        this.eventShowSocialStatus.emit(personResponse.personSourceList);
        this.eventShowTransport.emit(personResponse.dvList);
        this.eventShowScholarship.emit(personResponse.scholarship);
        this.eventShowMeriIpar.emit(personResponse.meriIpars);
        this.eventShowTax.emit(personResponse.taxes);

        this.getPersonGovMeasures(personResponse.iin, isToggle);
    }

    private getPersonGovMeasures(iin: string, isToggle?: boolean) {
        if (isToggle) {
            this.eventShowGovMeasure.emit(this.personGovMeasureList);
        } else {
            let personRequest = new BaseRequest();
            personRequest.iin = iin;
            this.personService.getPersonGovMeasures(personRequest).subscribe({
                next: govMeasureResponse => {
                    this.personGovMeasureList = govMeasureResponse;
                    this.eventShowGovMeasure.emit(govMeasureResponse);
                }, error: errorResponse => {
                    const errorText = this.utilService.getErrorMessage(errorResponse);
                    this.utilService.notifyError(errorText);
                }
            });
        }
    }

}
