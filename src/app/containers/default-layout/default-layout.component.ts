import {Component, OnInit} from '@angular/core';

import {NavItem, navItems} from './_nav';
import {TranslateService} from "@ngx-translate/core";
import {UserRoleService} from "../../services/user-role.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

    public navItems = this.getTranslatedNavItems();

    public perfectScrollbarConfig = {
        suppressScrollX: true,
    };

    constructor(
        private translateService: TranslateService,
        private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        // @ts-ignore
        this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
            this.navItems = this.getTranslatedNavItems();
            this.navItems = JSON.parse(JSON.stringify(this.navItems));
        });
    }

    getTranslatedNavItems(): NavItem[] {
        return navItems;
        let navItemsArray: NavItem[] = navItems.filter(item => !item.itemCode || (item.itemCode && this.userRoleService.hasPermission(item.itemCode)));
        navItemsArray.forEach(item => {
            if (item.children && item.children.length > 0) {
                item.children = item.children.filter(child => !child.itemCode || (child.itemCode && this.userRoleService.hasPermission(child.itemCode)));
            }
        });
        return navItemsArray.map(items => {
            this.translateNavItem(items);
            return items;
        });
    }

    translateNavItem(item: NavItem): void {
        if ('key' in item) {
            const translateValue = this.translateService.instant(`${item.key}`);
            if (translateValue !== `${item.key}`) {
                item.name = translateValue;
            }
        }
        if (item.children && item.children.length > 0) {
            item.children.map((child: any) => this.translateNavItem(child));
        }
    }
}
