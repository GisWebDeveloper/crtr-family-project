import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserRoleService} from "../../../services/user-role.service";
import {AuthService} from "../../../services/auth.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-asp',
    templateUrl: './asp.component.html',
    styleUrls: ['./asp.component.scss']
})
export class AspComponent implements OnInit {

    readonly permissions = Permissions.PERMISSIONS;

    constructor(private userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
    }

    hasPermission(item: string): boolean {
        return this.userRoleService.hasPermission(item);
    }
}
