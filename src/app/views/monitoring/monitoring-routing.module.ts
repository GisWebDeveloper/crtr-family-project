import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonitoringAspComponent} from "./monitoring-asp/monitoring-asp.component";
import {MonitoringAspPotentialComponent} from "./monitoring-asp-potential/monitoring-asp-potential.component";
import {MonitoringNeedActionsComponent} from "./monitoring-need-actions/monitoring-need-actions.component";
import {MonitoringChildPathComponent} from "./monitoring-child-path/monitoring-child-path.component";
import {MonitoringIncorrectDataComponent} from "./monitoring-incorrect-data/monitoring-incorrect-data.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthService} from "../../services/auth.service";
import {Permissions} from "../../models/administration/permissions";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'asp',
            }, {
                path: 'asp',
                component: MonitoringAspComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.MONITORING_ASP}
            }, {
                path: 'asp-potential',
                component: MonitoringAspPotentialComponent
            }, {
                path: 'child-path',
                component: MonitoringChildPathComponent,
            }, {
                path: 'need-actions',
                component: MonitoringNeedActionsComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.MONITORING_NEED_ACTIONS}
            }, {
                path: 'incorrect-data',
                component: MonitoringIncorrectDataComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.MONITORING_NEED_ACTIONS}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MonitoringRoutingModule {
}
