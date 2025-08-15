import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Permissions } from './models/administration/permissions';
import { UnauthorizedComponent } from './views/unauthorized/unauthorized.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { IinSearchGuard } from './guards/iin-search.guard';
import { NecessityModule } from './views/necessity/necessity.module';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login page',
        },
    },
    {
        path: 'logout',
        component: LoginComponent,
        data: {
            title: 'Login page',
        },
    },
    {
        path: '',
        redirectTo: 'need/need-actions',
        pathMatch: 'full',
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home',
        },
        children: [
            {
                path: 'administration',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.ADMINISTRATION },
                loadChildren: () =>
                    import('./views/administration/administration.module').then(
                        (m) => m.AdministrationModule
                    ),
            },
            {
                path: 'family/:iin',
                canActivate: [IinSearchGuard],
                loadChildren: () =>
                    import('./views/family/family.module').then(
                        (m) => m.FamilyModule
                    ),
            },
            {
                //TODO не знаю что за модуль
                path: 'form',
                loadChildren: () =>
                    import('./views/forms/fc-form.module').then(
                        (m) => m.FcFormModule
                    ),
            },
            {
                path: 'gov',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.GOV },
                loadChildren: () =>
                    import('./views/gov-agency/gov-agency.module').then(
                        (m) => m.GovAgencyModule
                    ),
            },
            {
                path: 'need',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.WORKSPACE },
                loadChildren: () =>
                    import('./views/need/need.module').then(
                        (m) => m.NeedModule
                    ),
            },
            {
                //     path: 'need-actions',
                //     loadChildren: () =>
                //         import('./views/need-actions/need-actions.module').then((m) => m.NeedActionsModule)
                // }, {
                //     path: 'kandas',
                //     loadChildren: () =>
                //         import('./views/kandas/kandas.module').then((m) => m.KandasModule)
                // }, {
                //     path: 'social-risks',
                //     loadChildren: () =>
                //         import('./views/social-risks/social-risks.module').then((m) => m.SocialRisksModule)
                // }, {
                path: 'monitoring',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.MONITORING },
                loadChildren: () =>
                    import('./views/monitoring/monitoring.module').then(
                        (m) => m.MonitoringModule
                    ),
            },
            {
                path: 'person',
                loadChildren: () =>
                    import('./views/person/person.module').then(
                        (m) => m.PersonModule
                    ),
            },
            {
                path: 'report',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.REPORT },
                loadChildren: () =>
                    import('./views/report/report.module').then(
                        (m) => m.ReportModule
                    ),
            },
            {
                path: 'segmentation',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.SEGMENTATION },
                loadChildren: () =>
                    import('./views/segmentation/segmentation.module').then(
                        (m) => m.SegmentationModule
                    ),
            },
            {
                path: 'segmentation-new',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.SEGMENTATION_NEW },
                loadChildren: () =>
                    import(
                        './views/segmentation-new/segmentation-new.module'
                    ).then((m) => m.SegmentationNewModule),
            },
            {
                path: 'social-statuses',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.SOC_STATUS },
                loadChildren: () =>
                    import(
                        './views/social-statuses/social-statuses.module'
                    ).then((m) => m.SocialStatusesModule),
            },
            {
                path: 'stat',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.MAIN },
                loadChildren: () =>
                    import('./views/statistics/statistics.module').then(
                        (m) => m.StatisticsModule
                    ),
            },
            {
                path: 'dynamic-stat',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.DYNAMIC_STAT },
                loadChildren: () =>
                    import(
                        './views/dynamic-statistics/dynamic-statistics.module'
                    ).then((m) => m.DynamicStatisticsModule),
            },
            {
                path: 'welfare',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.WELFARE },
                loadChildren: () =>
                    import('./views/welfare/welfare.module').then(
                        (m) => m.WelfareModule
                    ),
            },
            {
                path: 'asp',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.ASP_APPLICANT },
                loadChildren: () =>
                    import('./views/asp/asp.module').then((m) => m.AspModule),
            },
            {
                path: 'file-export',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.FILE_EXPORT },
                loadChildren: () =>
                    import('./views/file-export/file-export.module').then(
                        (m) => m.FileExportModule
                    ),
            },
            {
                path: 'region-statistics',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.REGION_STAT },
                loadChildren: () =>
                    import(
                        './views/region-statistics/region-statistics.module'
                    ).then((m) => m.RegionStatisticsModule),
            },
            {
                path: 'gov/mt/list',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.BENEFICIARY },
                loadChildren: () =>
                    import('./views/beneficiary/beneficiary.module').then(
                        (m) => m.BeneficiaryModule
                    ),
            },
            {
                path: 'unauthorized',
                component: UnauthorizedComponent,
            },
            {
                path: 'akim',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.AKIM_PAGE },
                loadChildren: () =>
                    import('./views/akim/akim.module').then(
                        (m) => m.AkimModule
                    ),
            },
            {
                path: 'tzhs',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.TZHS_PAGE },
                loadChildren: () =>
                    import('./views/tzhs/tzhs.module').then(
                        (m) => m.TzhsModule
                    ),
            },
            {
                path: 'necessity',
                canActivate: [AuthGuard],
                data: { permission: Permissions.PERMISSIONS.NECESSITY },
                loadChildren: () =>
                    import('./views/necessity/necessity.module').then(
                        (m) => m.NecessityModule
                    ),
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled',
            initialNavigation: 'enabledBlocking',
            // relativeLinkResolution: 'legacy'
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
