import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportNeedActionsComponent} from "./report-need-actions/report-need-actions.component";
import {ReportProactiveSmsComponent} from "./report-proactive-sms/report-proactive-sms.component";
import {ReportNeedAspComponent} from "./report-need-asp/report-need-asp.component";
import {ReportEmployablesComponent} from "./report-employables/report-employables.component";
import {ReportRatingComponent} from "./report-rating/report-rating.component";
import {KandasTzhsComponent} from "./kandas-tzhs/kandas-tzhs.component";
import {PereselencyTzhsComponent} from "./pereselency-tzhs/pereselency-tzhs.component";
import {DynamicTzhsExternalComponent} from "./dinamic-tzhs-external/dynamic-tzhs-external.component";
import {AuthGuard} from "../../guards/auth.guard";
import {Permissions} from "../../models/administration/permissions";
import {ReportMigrationComponent} from "./report-migration/report-migration.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo: 'need-actions',
            }, {
                path: 'need-actions',
                component: ReportNeedActionsComponent
            }, {
                path: 'need-asp',
                component: ReportNeedAspComponent
            }, {
                path: 'proactive-sms',
                component: ReportProactiveSmsComponent
            }, {
                path: 'employables',
                component: ReportEmployablesComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_EMPLOYABLES}
            }, {
                path: 'ranking',
                component: ReportRatingComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_RATING}
            }, {
                path: 'kandas-tzhs',
                component: KandasTzhsComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_KANDAS_TZHS}
            }, {
                path: 'pereselency-tzhs',
                component: PereselencyTzhsComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_KANDAS_TZHS}
            }, {
                path: 'dynamic-tzhs',
                component: DynamicTzhsExternalComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_DYNAMIC_TZHS}
            }, {
                path: 'migration',
                component: ReportMigrationComponent,
                canActivate: [AuthGuard],
                data: {permission: Permissions.PERMISSIONS.REPORT_MIGRATION}
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
