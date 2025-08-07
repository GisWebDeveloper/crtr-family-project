import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FamilyResponse} from "../../../models/family/family-response";
import {FamilyMember} from "../../../models/family/family-member";
import {Family} from "../../../models/family/family";
import {TranslateService} from "@ngx-translate/core";
import {UtilService} from "../../../services/util.service";
import {FamilyStatusInfo} from "../../../models/family/family-status-info";
import {FamilyLphInfo} from "../../../models/family/family-lph-info";
import {UserRoleService} from "../../../services/user-role.service";
import {FamilyService} from "../../../services/family.service";
import {ReportService} from "../../../services/report.service";
import * as FileSaver from 'file-saver';
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";
import {FamilyCategoryHistory} from "../../../models/family/family-category-history";

@Component({
    selector: 'app-family-portrait',
    templateUrl: './family-portrait.component.html',
    styleUrls: ['./family-portrait.component.scss']
})
export class FamilyPortraitComponent implements OnInit {

    @Input() showFamilyPortrait: EventEmitter<FamilyResponse>;

    @Output() eventShowPersonPortrait: EventEmitter<string> = new EventEmitter();
    @Output() eventShowIin: EventEmitter<string> = new EventEmitter();
    @Output() eventShowGraphModal: EventEmitter<{
        familyCategoryHistoryList: Array<FamilyCategoryHistory>,
        familyMember: FamilyMember
    }> = new EventEmitter();
    @Output() eventShowTzhsPointsModal: EventEmitter<any> = new EventEmitter();

    visible = [true];
    readonly permissions = Permissions.PERMISSIONS;

    address: string;
    addressActual: string;
    displayPersonalInfo: boolean;
    family: Family;
    familyLphList: Array<FamilyLphInfo>;
    familyMemberList: Array<FamilyMember>;
    familyStatusList: Array<FamilyStatusInfo>;
    familyCategoryHistoryList: Array<FamilyCategoryHistory>;
    hasAdminPermissions: boolean = false;
    selectedFMIIIN: string;

    incomeParams: {
        display: boolean,
        salaryArray: Array<number>,
        socPaymentArray: Array<number>,
        sddArray: Array<number>
    }

    riskList: Array<string> = [];

    constructor(private familyService: FamilyService,
                private reportService: ReportService,
                public translateService: TranslateService,
                private userRoleService: UserRoleService,
                public utilService: UtilService,
                public authService: AuthService) {
    }

    ngOnInit(): void {
        this.displayPersonalInfo = false;
        this.hasAdminPermissions = this.userRoleService.hasRole('CKS_ADMIN');
        this.incomeParams = {
            display: false,
            salaryArray: this.getRandomIntArray(6, 8),
            socPaymentArray: this.getRandomIntArray(6, 7),
            sddArray: this.getRandomIntArray(5, 7),
        }
        this.showFamilyPortrait.asObservable().subscribe(familyResponse => {

            this.family = familyResponse.family;
            this.familyLphList = familyResponse.familyLphList;
            this.familyStatusList = familyResponse.familyStatusList;
            this.familyCategoryHistoryList = familyResponse.familyCategoryHistory;
            this.familyMemberList = this.familyService.getSortedMemberList(familyResponse.familyMemberList);

            // ADDRESS FIELDS
            const addressFieldCode = this.translateService.currentLang == 'kz' ? 'addressKz' : 'addressRu';
            this.address = familyResponse[addressFieldCode];
            this.addressActual = familyResponse.factAddress;

            this.generateRiskList();
            this.calcDisplayPersonalInfo(this.family);
            this.selectFamilyMember(familyResponse.iin);
        });
    }

    toggleCollapse(id: number): void {
        this.visible[id] = !this.visible[id];
    }

    selectFamilyMember(iin: string) {
        this.selectedFMIIIN = iin;
        this.eventShowPersonPortrait.emit(iin);
        this.eventShowIin.emit(iin);
    }

    private calcDisplayPersonalInfo(family: Family) {
        // if (family && family.familyQuality && family.familyQuality.tzhsDictionary) {
        //     const tzhsId = family.familyQuality.tzhsDictionary.id;
        //     this.displayPersonalInfo = (this.userRoleService.hasRole('CKS_ADMIN') && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT))
        //         || (([9, 10, 11, 12, 13, 14].includes(tzhsId) && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT)));
        //     this.incomeParams.display = [9, 10, 11, 12, 13, 14].includes(tzhsId);
        // } else if (family && family.familyQuality) {
        //     this.displayPersonalInfo = this.userRoleService.hasRole('CKS_ADMIN') && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT);
        // }

        if (family && family.familyQuality && family.familyQuality.tzhsDictionary) {
            const tzhsSdu = family.familyQuality.tzhsSdu;
            this.displayPersonalInfo = ((this.userRoleService.hasRole('CKS_MTSZN_LEADERSHIP') || this.userRoleService.hasRole('CKS_ADMIN') || this.userRoleService.hasRole('CKS_CRTR_demo')) && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT))
                || ((['D', 'E'].includes(tzhsSdu) && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT)));
            this.incomeParams.display = ['D', 'E'].includes(tzhsSdu);
        } else if (family && family.familyQuality) {
            this.displayPersonalInfo = (this.userRoleService.hasRole('CKS_MTSZN_LEADERSHIP') || this.userRoleService.hasRole('CKS_ADMIN') || this.userRoleService.hasRole('CKS_CRTR_demo')) && this.userRoleService.hasPermission(Permissions.PERMISSIONS.PERSON_PORTRAIT);
        }
    }

    downloadFamilyCard() {
        if (this.hasAdminPermissions) {
            this.reportService.downloadFamilyCardPdf(this.selectedFMIIIN, {responseType: 'blob'}).subscribe(response => {
                //@ts-ignore
                FileSaver.saveAs(response, "family-card.pdf");
            });
        }
    }

    private getRandomIntArray(min: number, max: number): Array<number> {
        const randomCount = this.utilService.getRandomNumber(min, max);
        return [...Array(randomCount).keys()].map(i => i + 1);
    }

    private generateRiskList() {
        this.riskList = [];
        const RISK_MAP = ['I', 'C', 'M', 'D', 'O', 'S', 'E', 'B', 'P', 'F', 'J', 'L'];
        const TRANSLATE_MAP = [
            'family-portrait.risks.income',
            'family-portrait.risks.credit',
            'family-portrait.risks.medical-attachment',
            'family-portrait.risks.dispensary',
            'family-portrait.risks.health-insurance',
            'family-portrait.risks.preschool',
            'family-portrait.risks.school',
            'family-portrait.risks.bankruptcy',
            'family-portrait.risks.minor-committed',
            'family-portrait.risks.household-convicted',
            'family-portrait.risks.household-victim',
            'family-portrait.risks.household-committed',
        ];
        if (this.family.familyQuality.riskDetail) {
            const riskDetail = this.family.familyQuality.riskDetail;
            for (let i = 0; i < riskDetail.length; i++) {
                const riskValue = this.family.familyQuality.riskDetail.substring(i, i + 1);
                if (riskValue === RISK_MAP[i]) {
                    this.riskList.push(this.utilService.getTranslationValue(TRANSLATE_MAP[i]));
                }
            }
        }
    }

    openTzhsHistoryGraphModal() {
        this.eventShowGraphModal.emit({
            familyCategoryHistoryList:this.familyCategoryHistoryList,
            familyMember: this.familyMemberList.filter(temp => temp.iin === this.selectedFMIIIN)[0]
        });
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

    openTzhsPointsModal() {
        this.eventShowTzhsPointsModal.emit({iin: this.selectedFMIIIN, sduTzhs: this.family.familyQuality.tzhsSdu});
    }

}
