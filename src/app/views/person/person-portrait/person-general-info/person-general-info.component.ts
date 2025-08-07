import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../../services/util.service";
import {Document} from "../../../../models/person/document";
import {Person} from "../../../../models/person/person";
import {PersonService} from "../../../../services/person.service";
import {PersonInfo} from "../../../../models/person/person-info";
import {ZagsInfo} from "../../../../models/zags/zags-info";
import {BaseRequest} from "../../../../models/base-request";
import {ZagsActBirth} from "../../../../models/zags/zags-act-birth";
import {ZagsActDivorce} from "../../../../models/zags/zags-act-divorce";
import {ZagsActMarriage} from "../../../../models/zags/zags-act-marriage";
import {ReportService} from "../../../../services/report.service";
import * as FileSaver from 'file-saver';
import {PersonForm} from "../../../../models/person/person-form";
import {DictionaryCommon} from "../../../../models/dictionary-common";
import {Router} from "@angular/router";
import {UserRoleService} from "../../../../services/user-role.service";
import {AuthService} from "../../../../services/auth.service";
import {Permissions} from "../../../../models/administration/permissions";

@Component({
    selector: 'app-person-general-info',
    templateUrl: './person-general-info.component.html',
    styleUrls: ['./person-general-info.component.scss']
})
export class PersonGeneralInfoComponent implements OnInit {

    @Input() isFormMode: boolean;
    @Input() hasAdminPermissions: boolean;
    @Input() showGeneralInfo: EventEmitter<PersonInfo>;

    @Output() showRegAddressModal: EventEmitter<string> = new EventEmitter<string>();
    @Output() showRegAddressHistoryModal: EventEmitter<string> = new EventEmitter<string>();
    @Output() showBirCalculationModal: EventEmitter<string> = new EventEmitter<string>();

    // 0. ZAGS INFO // 1. EDIT FACT ADDRESS
    visible = [true, false];

    attrDictionary: DictionaryCommon | undefined;
    document: Document;
    factAddress: string | undefined;
    person: Person;
    personPhoneNumber: string;
    zagsParams: ZagsInfo;
    phoneParams: {
        phoneNumber: string,
        status: number
    }

    formParams: {
        address: string,
        editAddress: boolean
    }
    permissions = Permissions.PERMISSIONS;

    constructor(public personService: PersonService,
                private reportService: ReportService,
                private router: Router,
                public translateService: TranslateService,
                private userRoleService: UserRoleService,
                public utilService: UtilService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.initFormParams();
        this.initZagsParams();
        this.showGeneralInfo.asObservable().subscribe(personInfo => {
            this.attrDictionary = personInfo.attrDictionary;
            this.document = personInfo.document;
            this.factAddress = personInfo.factAddress;
            this.person = personInfo.person;
            this.personPhoneNumber = personInfo.personPhoneNumber;

            this.initPhoneParams();
            this.getPersonZagsInfo(this.person.iin);
        });
    }

    private initPhoneParams() {
        this.phoneParams = {
            phoneNumber: this.personPhoneNumber,
            status: 0
        }
    }

    private initZagsParams() {
        this.zagsParams = {
            birthList: new Array<ZagsActBirth>(),
            divorceList: new Array<ZagsActDivorce>(),
            hasData: false,
            marriageList: new Array<ZagsActMarriage>(),
            parents: new ZagsActBirth()
        }
    }

    private initFormParams() {
        this.formParams = {
            address: '',
            editAddress: false
        }
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

    findPersonPhone() {
        if (this.person.iin) {
            this.phoneParams.status = 1;
            let request = new BaseRequest();
            request.iin = this.person.iin;
            this.personService.getPersonPhoneNumber(request).subscribe({
                next: phone => {
                    if (phone) {
                        this.phoneParams.phoneNumber = phone;
                        this.phoneParams.status = 0;
                    } else {
                        this.phoneParams.phoneNumber = '';
                        this.phoneParams.status = 2;
                    }
                }, error: errorResponse => {
                    const errorText = this.utilService.getErrorMessage(errorResponse);
                    this.utilService.notifyError(errorText);
                }
            });
        }
    }

    private getPersonZagsInfo(iin: string) {
        // Hide zags info
        this.visible[0] = false;
        if (this.hasPermission(Permissions.PERMISSIONS.PERSON_ZAGS_INFO)) {
            let personRequest = new BaseRequest();
            personRequest.iin = iin;
            this.personService.getPersonZagsInfo(personRequest).subscribe({
                next: zagsResponse => {
                    this.zagsParams.birthList = zagsResponse.birthList;
                    this.zagsParams.parents = zagsResponse.parents;
                    if (zagsResponse.marriageList) {
                        zagsResponse.marriageList.forEach(m => {
                            const isWife = m.manIin === iin;
                            m.spouseIin = isWife ? m.womanIin : m.manIin;
                            m.spouseFullName = isWife ? m.womanFullName : m.manFullName;
                        });
                        this.zagsParams.marriageList = zagsResponse.marriageList;
                    }
                    if (zagsResponse.divorceList) {
                        zagsResponse.divorceList.forEach(m => {
                            const isWife = m.manIin === iin;
                            m.spouseIin = isWife ? m.womanIin : m.manIin;
                            m.spouseFullName = isWife ? m.womanFullName : m.manFullName;
                        });
                        this.zagsParams.divorceList = zagsResponse.divorceList;
                    }
                    this.zagsParams.hasData = this.zagsParams.birthList.length > 0 || this.zagsParams.divorceList.length > 0 || this.zagsParams.marriageList.length > 0 || (this.zagsParams.parents && !!this.zagsParams.parents.id);

                }, error: errorResponse => {
                    const errorText = this.utilService.getErrorMessage(errorResponse);
                    this.utilService.notifyError(errorText);
                }
            });
        }
    }

    downloadPersonCard() {
        if (this.hasAdminPermissions) {
            this.reportService.downloadPersonCardPdf(this.person.iin, {responseType: 'blob'}).subscribe(response => {
                //@ts-ignore
                FileSaver.saveAs(response, "person-card.pdf");
            });
        }
    }

    savePersonFactAddress() {
        if (!this.visible[1]) {
            this.visible[1] = true;
        } else if (this.person.iin) {
            if (this.factAddress && this.factAddress.length > 0) {
                let request = new PersonForm();
                request.iin = this.person.iin;
                request.address = this.factAddress;
                this.personService.savePersonForm(request).subscribe(response => {
                    this.visible[1] = false;
                    this.utilService.notifySuccess('Фактический адрес успешно сохранен!');
                });
            } else {
                this.utilService.notifyWarning('Введите Фактический адрес');
            }
        }
    }

    openPersonForm() {
        this.router.navigate(['form/person/' + this.person.iin]).then();
    }

    openKandasPersonForm() {
        this.router.navigate(['form/kandasPerson/' + this.person.iin]).then();
    }

    openPersonPortrait() {
        this.router.navigate(['family/' + this.person.iin]).then();
    }

    openRegAddressModal() {
        this.showRegAddressModal.emit(this.person.iin);
    }

    openPersonTimeline() {
        this.router.navigate(['person/timeline/' + this.person.iin]).then();
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

    openRegAddressHistoryModal() {
        this.showRegAddressHistoryModal.emit(this.person.iin);
    }

    openBirCalculationModal() {
        this.showBirCalculationModal.emit(this.person.iin);
    }
}
