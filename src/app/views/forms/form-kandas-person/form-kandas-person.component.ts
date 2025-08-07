import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UtilService} from "../../../services/util.service";
import {PersonInfo} from "../../../models/person/person-info";
import {PersonResponse} from "../../../models/person/person-response";
import {ActivatedRoute} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {UserRoleService} from "../../../services/user-role.service";
import {BaseRequest} from "../../../models/base-request";
import {DataService} from "../../../services/data.service";
import {KandasService} from "../../../services/kandas.service";

@Component({
    selector: 'app-form-kandas-person',
    templateUrl: './form-kandas-person.component.html',
    styleUrls: ['./form-kandas-person.component.scss']
})
export class FormKandasPersonComponent implements OnInit {

    @Output() eventShowGeneralInfo: EventEmitter<PersonInfo> = new EventEmitter();
    @Output() eventShowFormKandas: EventEmitter<{ iin: string, countId: number }> = new EventEmitter();
    @Output() eventShowFormPereselentsy: EventEmitter<{ iin: string, countId: number }> = new EventEmitter();
    @Output() eventShowFormSusn: EventEmitter<string> = new EventEmitter();


    // person form
    visible = [true];

    hasAdminPermissions: boolean;
    personResponse: PersonResponse;

    // 0 - kandas, 1 - pereselensy, 2 - susn
    formPermissions = [false, false, false];
    currentIin: string;

    constructor(private activatedRoute: ActivatedRoute,
                private personService: PersonService,
                private userRoleService: UserRoleService,
                private utilService: UtilService,
                private kandasService: KandasService) {
    }

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe(param => {
            this.currentIin = param.get('iin') || "";
            this.hasAdminPermissions = this.userRoleService.hasRole('CKS_ADMIN');
            this.initFormPermissions();
        });
    }

    private initFormPermissions() {
        this.kandasService.getAvailableForms(this.currentIin).subscribe({
            next: param => {
                this.formPermissions[0] = param.isKandas;
                this.formPermissions[1] = param.isPereselensy;
                this.formPermissions[2] = param.isSusn;
                this.getPersonInfo(this.currentIin);
            }, error: errorResponse => {
                const errorText = this.utilService.getErrorMessage(errorResponse);
                this.utilService.notifyError(errorText);
            }
        });

        // this.formPermissions[0] = this.userRoleService.hasPermission('kandas.form-kandas-person');
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
        if (this.formPermissions[0]) this.eventShowFormKandas.emit({iin: this.currentIin, countId: 1058});
        if (this.formPermissions[1]) this.eventShowFormPereselentsy.emit({iin: this.currentIin, countId: 1059});
        if (this.formPermissions[2]) this.eventShowFormSusn.emit(iin);
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
