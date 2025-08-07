import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {UserRoleService} from "../../../services/user-role.service";
import {UtilService} from "../../../services/util.service";
import {BaseRequest} from "../../../models/base-request";
import {PersonResponse} from "../../../models/person/person-response";
import {PersonInfo} from "../../../models/person/person-info";
import {DataService} from "../../../services/data.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-form-person',
    templateUrl: './form-person.component.html',
    styleUrls: ['./form-person.component.scss']
})
export class FormPersonComponent implements OnInit {

    @Output() eventShowGeneralInfo: EventEmitter<PersonInfo> = new EventEmitter();
    @Output() eventShowFormNeedActions: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormMON: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormMF: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormMIOR: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormMZ: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormAspApplicant: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormXCategory: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormDCategory: EventEmitter<string> = new EventEmitter();
    @Output() eventShowFormECategory: EventEmitter<string> = new EventEmitter();

    // person form
    visible = [true];

    hasAdminPermissions: boolean;
    personResponse: PersonResponse;

    // 0 - NeedActions; 1 - MON; 2 - MF; 3 - MIOR; 4 - MZ, 5 - ASPAPPLICANT; 6 - x_category, 7 - d category; 8 - e category
    formPermissions = [false, false, false, false, false, false, false, false, false];

    constructor(private activatedRoute: ActivatedRoute,
                private personService: PersonService,
                private userRoleService: UserRoleService,
                private utilService: UtilService) {
    }

    ngOnInit(): void {
        const iinValue = this.activatedRoute.snapshot.paramMap.get('iin') || "";
        this.hasAdminPermissions = this.userRoleService.hasRole('CKS_ADMIN');
        this.initFormPermissions();
        this.getPersonInfo(iinValue);
    }

    private initFormPermissions() {
        this.formPermissions[0] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.WORKSPACE);
        this.formPermissions[1] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.GOV_MON_LIST);
        this.formPermissions[2] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.GOV_MF_LIST);
        this.formPermissions[3] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.GOV_MIOR_LIST);
        this.formPermissions[4] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.GOV_MZ_LIST);
        this.formPermissions[5] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.ASP_APPLICANT);
        this.formPermissions[6] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.GOV_X_CATEGORY_LIST);
        this.formPermissions[7] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.D_CATEGORY_LIST);
        this.formPermissions[8] = this.userRoleService.hasPermission(Permissions.PERMISSIONS.E_CATEGORY_LIST);
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

    private emitEvents(iin: string, personResponse: PersonResponse) {
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
        if (this.formPermissions[0]) this.eventShowFormNeedActions.emit(personInfo.person.iin);
        if (this.formPermissions[1]) this.eventShowFormMON.emit(personInfo.person.iin);
        if (this.formPermissions[2]) this.eventShowFormMF.emit(personInfo.person.iin);
        if (this.formPermissions[3]) this.eventShowFormMIOR.emit(personInfo.person.iin);
        if (this.formPermissions[4]) this.eventShowFormMZ.emit(personInfo.person.iin);
        if (this.formPermissions[5]) this.eventShowFormAspApplicant.emit(personInfo.person.iin);
        if (this.formPermissions[6]) this.eventShowFormXCategory.emit(personInfo.person.iin);
        if (this.formPermissions[7]) this.eventShowFormDCategory.emit(personInfo.person.iin);
        if (this.formPermissions[8]) this.eventShowFormECategory.emit(personInfo.person.iin);
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];

        // Rerender child components
        if (id === 0 && this.visible[id]) {
            setTimeout(() => {
                this.emitEvents(this.personResponse.gblPerson.iin, this.personResponse);
            }, DataService.EVENT_DELAY_SHORT);
        }
    }

}
