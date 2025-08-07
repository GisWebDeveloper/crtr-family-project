import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GovAgencyMonListComponent} from "./gov-agency-mon-list/gov-agency-mon-list.component";
import {GovAgencyMfListComponent} from "./gov-agency-mf-list/gov-agency-mf-list.component";
import {GovAgencyMiorListComponent} from "./gov-agency-mior-list/gov-agency-mior-list.component";
import {GovAgencyMzListComponent} from "./gov-agency-mz-list/gov-agency-mz-list.component";
import {GovAgencyMonReportComponent} from "./gov-agency-mon-report/gov-agency-mon-report.component";
import {GovAgencyMfReportComponent} from "./gov-agency-mf-report/gov-agency-mf-report.component";
import {GovAgencyMiorReportComponent} from "./gov-agency-mior-report/gov-agency-mior-report.component";
import {GovAgencyMzReportComponent} from "./gov-agency-mz-report/gov-agency-mz-report.component";
import {GovAgencyMvdListComponent} from "./gov-agency-mvd-list/gov-agency-mvd-list.component";
import {GovAgencyMvdReportComponent} from "./gov-agency-mvd-report/gov-agency-mvd-report.component";
import {GovAgencyMonReportDynamicComponent} from "./gov-agency-mon-report-dynamic/gov-agency-mon-report-dynamic.component";
import {GovAgencyMiorReportDynamicNeetComponent} from "./gov-agency-mior-report-dynamic/gov-agency-mior-report-dynamic-neet/gov-agency-mior-report-dynamic-neet.component";
import {GovAgencyMzReportDynamicOsmsComponent} from "./gov-agency-mz-report-dynamic/gov-agency-mz-report-dynamic-osms/gov-agency-mz-report-dynamic-osms.component";
import {GovAgencyMfReportDynamicIpComponent} from "./gov-agency-mf-report-dynamic/gov-agency-mf-report-dynamic-ip/gov-agency-mf-report-dynamic-ip.component";
import {XCategoryComponent} from "./x-category/x-category.component";
import {GovRepDEComponent} from "./gov-rep-de/gov-rep-de.component";
import {AuthGuard} from "../../guards/auth.guard";
import {AuthService} from "../../services/auth.service";
import {Permissions} from "../../models/administration/permissions";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'mon',
                children: [
                    {
                        path: 'list',
                        component: GovAgencyMonListComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MON_LIST}
                    }, {
                        path: 'report',
                        component: GovAgencyMonReportComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MON_REPORT}
                    }, {
                        path: 'dynamic',
                        component: GovAgencyMonReportDynamicComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MON_REPORT}
                    }
                ]
            }, {
                path: 'mf',
                children: [
                    {
                        path: 'list',
                        component: GovAgencyMfListComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MF_LIST}
                    }, {
                        path: 'report',
                        component: GovAgencyMfReportComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MF_LIST}
                    }, {
                        path: 'dynamic',
                        component: GovAgencyMfReportDynamicIpComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MF_LIST}
                    }
                ]
            }, {
                path: 'mior',
                children: [
                    {
                        path: 'list',
                        component: GovAgencyMiorListComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MIOR_LIST}
                    }, {
                        path: 'report',
                        component: GovAgencyMiorReportComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MIOR_LIST}
                    }, {
                        path: 'dynamic',
                        component: GovAgencyMiorReportDynamicNeetComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MIOR_LIST}
                    }
                ]
            }, {
                path: 'mz',
                children: [
                    {
                        path: 'list',
                        component: GovAgencyMzListComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MZ_LIST}
                    }, {
                        path: 'report',
                        component: GovAgencyMzReportComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MZ_LIST}
                    }, {
                        path: 'dynamic',
                        component: GovAgencyMzReportDynamicOsmsComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MZ_LIST}
                    }
                ]
            }, {
                path: 'mvd',
                children: [
                    {
                        path: 'list',
                        component: GovAgencyMvdListComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_MVD_LIST}
                    }, {
                        path: 'report',
                        component: GovAgencyMvdReportComponent
                    }
                ]
            }, {
                path: 'x-category',
                children: [
                    {
                        path: 'list',
                        component: XCategoryComponent,
                        canActivate: [AuthGuard],
                        data: {permission: Permissions.PERMISSIONS.GOV_X_CATEGORY_LIST}
                    }
                ]
            }, {
                path: 'rep-de',
                component: GovRepDEComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.GOV_REP_DE}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GovAgencyRoutingModule {
}
