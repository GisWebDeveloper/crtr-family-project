import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Income} from "../../../../models/common/income";
import {UserRoleService} from "../../../../services/user-role.service";
import {Scholarship} from "../../../../models/common/scholarship";

@Component({
    selector: 'app-person-income',
    templateUrl: './person-income.component.html',
    styleUrls: ['./person-income.component.scss']
})
export class PersonIncomeComponent implements OnInit {

    @Input() displayPersonalInfo: boolean;
    @Input() showIncome: EventEmitter<Array<Income>>;
    @Input() showScholarShip: EventEmitter<Scholarship>;

    hasAdminPermissions: boolean = false;
    personIncomeList: Array<Income>;
    personScholarship: Scholarship;

    constructor(
        public translateService: TranslateService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.hasAdminPermissions = this.userRoleService.hasRole('CKS_ADMIN');
        this.personIncomeList = new Array<Income>();
        this.showIncome.asObservable().subscribe(incomeList => {
            this.personIncomeList = incomeList;
        });
        this.showScholarShip.asObservable().subscribe(sholarship => {
            this.personScholarship = sholarship;
        })
    }

    getOrgInfo(bin: string, name: string): string {
        let result = '';
        bin = bin.trim();
        if (bin && bin.length >= 12) {
            result = bin.substring(0, 3).padEnd(bin.length - 1, '*').concat(bin.substring(bin.length - 1));
        }
        return result.concat(this.hasAdminPermissions ? ' - ' + name : '').trim();
    }

}
