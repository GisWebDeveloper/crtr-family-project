import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dictionary} from "../../../models/dictionary";
import {UserRoleService} from "../../../services/user-role.service";
import {Permissions} from "../../../models/administration/permissions";

@Component({
    selector: 'app-stat-tzhs-status',
    templateUrl: './stat-tzhs-status.component.html',
    styleUrls: ['./stat-tzhs-status.component.scss']
})
export class StatTzhsStatusComponent implements OnInit {

    @Input() statusDictionary: Dictionary;
    @Input() eventSearchStatusStat: EventEmitter<any>;
    @Output() tabChanged: EventEmitter<any> = new EventEmitter<any>();

    readonly permissions = Permissions.PERMISSIONS;

    constructor(public userRoleService: UserRoleService) {
    }

    ngOnInit(): void {
        this.eventSearchStatusStat.subscribe(data => {
            this.statusDictionary = data;
        });
    }

    onTabChange(tabNumber: number) {
        this.tabChanged.emit(tabNumber);
    }
}
