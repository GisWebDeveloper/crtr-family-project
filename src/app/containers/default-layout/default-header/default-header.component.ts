import {Component, Input} from '@angular/core';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {AuthService} from "../../../services/auth.service";
import {UtilService} from "../../../services/util.service";
import {UserRoleService} from "../../../services/user-role.service";
import {DataService} from "../../../services/data.service";
import {TranslateService} from "@ngx-translate/core";
import {Permissions} from "../../../models/administration/permissions";
import {AvailableIinsService} from "../../../services/available-iins.service";

@Component({
    selector: 'app-default-header',
    templateUrl: './default-header.component.html',
    styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent {

    @Input() sidebarId: string = "sidebar";

    iin: string;
    fullName: string;
    fullNameMode: string = 'NAME';
    permissions = Permissions.PERMISSIONS;

    constructor(public authService: AuthService,
                private classToggler: ClassToggleService,
                private dataService: DataService,
                public translateService: TranslateService,
                private utilService: UtilService,
                private userRoleService: UserRoleService,
                private availableIinsService: AvailableIinsService) {
        super();
    }
    
    setCurrentLang(lang:string):void{
        debugger;
        this.translateService.use(lang);
        localStorage.setItem('appLang', lang);
    }

    searchByIIN() {
        this.availableIinsService.addIin(this.iin);
        this.dataService.setPersonIIN(this.iin);
        this.dataService.setPersonSearchMode('IIN');
        this.utilService.redirectTo('/person/search');
    }

    searchByFullName() {
        this.dataService.setPersonFullName(this.fullName);
        this.dataService.setPersonSearchMode(this.fullNameMode);
        this.utilService.redirectTo('/person/search');
    }

    logout() {
        this.authService.logout();
    }

    userRegion(): string {
        return this.authService.getUserRegion();
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }

    hasPermissions(item1: string, item2: string): boolean {
        return this.userRoleService.hasPermission(item1) || this.userRoleService.hasPermission(item2);
    }

    toggleSearchFullName(mode: string) {
        this.fullName = '';
        this.fullNameMode = mode;
    }

    getSearchDescriptionKey(): string {
        let translateKey = '';
        if (this.fullNameMode == 'FULL') {
            translateKey = 'header-menu.search.full-name';
        } else if (this.fullNameMode == 'NAME') {
            translateKey = 'header-menu.search.surname-name';
        } else if (this.fullNameMode == 'SURNAME') {
            translateKey = 'header-menu.search.surname';
        }
        return translateKey;
    }

    changeLanguage(lang: string) {
        this.dataService.setClientLanguage(lang);
        this.translateService.use(lang);
    }
}
