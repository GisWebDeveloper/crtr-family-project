import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    AlertModule,
    ButtonGroupModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule,
    ModalModule, NavModule,
    TableModule, TabsModule,
    UtilitiesModule
} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {TranslateModule} from "@ngx-translate/core";
import {StatisticsRoutingModule} from "./statistics-routing.module";
import {StatTzhsStatusTableComponent} from './stat-tzhs-status/stat-tzhs-status-table/stat-tzhs-status-table.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {StatListModalComponent} from './stat-list-modal/stat-list-modal.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {StatMainComponent} from './stat-main/stat-main.component';
import {StatMainPopulationComponent} from './stat-main-population/stat-main-population.component';
import {StatMainFamilyTypeComponent} from './stat-main-family-type/stat-main-family-type.component';
import {StatMainMemberCountComponent} from './stat-main-member-count/stat-main-member-count.component';
import {StatMainChildCountComponent} from './stat-main-child-count/stat-main-child-count.component';
import {StatMainIncomePmComponent} from './stat-main-income-pm/stat-main-income-pm.component';
import {StatMainSusnComponent} from './stat-main-susn/stat-main-susn.component';
import {StatMainChildMonitoringComponent} from './stat-main-child-monitoring/stat-main-child-monitoring.component';
import {FcSharedModule} from "../fc-shared.module";
import { StatTzhsStatusComponent } from './stat-tzhs-status/stat-tzhs-status.component';
import { StatTzhsStatusExtendedTableComponent } from './stat-tzhs-status/stat-tzhs-status-extended-table/stat-tzhs-status-extended-table.component';
import { StatTzhsStatusSduTableComponent } from './stat-tzhs-status/stat-tzhs-status-sdu-table/stat-tzhs-status-sdu-table.component';
import { StatTzhsStatusTwoTableComponent } from './stat-tzhs-status/stat-tzhs-status-two-table/stat-tzhs-status-two-table.component';
import { StatTzhsStatusSduTwoDifferenceTableComponent } from './stat-tzhs-status/stat-tzhs-status-sdu-two-difference-table/stat-tzhs-status-sdu-two-difference-table.component';


@NgModule({
    declarations: [
        StatListModalComponent,
        StatMainChildCountComponent,
        StatMainChildMonitoringComponent,
        StatMainComponent,
        StatMainFamilyTypeComponent,
        StatMainIncomePmComponent,
        StatMainMemberCountComponent,
        StatMainPopulationComponent,
        StatMainSusnComponent,
        StatTzhsStatusTableComponent,
        StatTzhsStatusComponent,
        StatTzhsStatusExtendedTableComponent,
        StatTzhsStatusSduTableComponent,
        StatTzhsStatusTwoTableComponent,
        StatTzhsStatusSduTwoDifferenceTableComponent
    ],
    exports: [
        StatListModalComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        ButtonGroupModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        NavModule,
        TabsModule,
        GridModule,
        FcSharedModule,
        FormModule,
        FormsModule,
        IconModule,
        ModalModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        StatisticsRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
    ]
})
export class StatisticsModule {
}
