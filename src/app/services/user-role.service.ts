import {Injectable} from '@angular/core';
import {DataService} from "./data.service";
import {navItems} from "../containers/default-layout/_nav";
import {AuthService} from "./auth.service";
import {Permissions} from "../models/administration/permissions";

@Injectable({
    providedIn: 'root'
})
export class UserRoleService {

    private _userRoles = Array<any>();

    constructor(private dataService: DataService) {
    }

    set userRoles(userRoles: Array<any>) {
        this._userRoles = userRoles;
    }

    get userRoles(): Array<any> {
        return this._userRoles;
    }

    addUserRole(data: any) {
        this._userRoles.push(data);
    }

    private getUserInfoFromStorage(type?: string) {
        type = type || 'ROLE';
        let list: string[] = [];
        const userAuth = JSON.parse(this.dataService.getUserAuth() || '{}');
        if (userAuth && Object.keys(userAuth).length > 0) {
            if (type == 'ROLE') {
                for (const role of userAuth.roles) {
                    list.push(role.code);
                }
            } else if (type == 'PERMISSION') {
                for (const permission of userAuth.permissions) {
                    list.push(permission);
                }
            }
        }
        return list;
    }

    hasRole(role: string) {
        let roleList: string[] = this.getUserInfoFromStorage();
        return roleList.includes(role);
    }

    hasRoles(roles: string[]) {
        let hasRole: boolean = false;
        let roleList: string[] = this.getUserInfoFromStorage();
        for (const r of roles) {
            hasRole = roleList.includes(r);
            if (hasRole) break;
        }
        return hasRole;
    }

    hasPermission(permission: string): boolean {
        let permissionList: string[] = this.getUserInfoFromStorage('PERMISSION');
        return permissionList.findIndex(element => element.toLowerCase() === permission.toLowerCase()) >= 0;
    }

    getRoutePath(): string {
        let page = '';
        if (this.hasPermission(Permissions.PERMISSIONS.WORKSPACE)) {
            page = 'need/need-actions';
        } else {
            let navItem = undefined;
            let navItemArray = navItems;
            for (let i = 0; i < navItemArray.length; i++) {
                const item = navItemArray[i];
                if (item.itemCode && this.hasPermission(item.itemCode)) {
                    navItem = item;
                    if (item.children && item.children.length > 0) {
                        for (let j = 0; j < item.children.length; j++) {
                            const childItem = item.children[j];
                            if (childItem.itemCode && this.hasPermission(childItem.itemCode)) {
                                navItem = childItem;
                                break;
                            }
                        }
                    }
                }
                if (navItem) break;
            }
            if (navItem) {
                page = navItem.url && Array.isArray(navItem) ? navItem.url[0] : navItem.url;
            }
        }
        return page
    }
}
