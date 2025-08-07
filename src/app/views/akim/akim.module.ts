import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AkimMemberComponent} from './akim-member/akim-member.component';
import {AkimRoutingModule} from "./akim-routing.module";
import {
    AlertModule, ButtonGroupModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    TableModule, TooltipModule, UtilitiesModule
} from "@coreui/angular";
import {FcSharedModule} from "../fc-shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {StatisticsModule} from "../statistics/statistics.module";
import {TranslateModule} from "@ngx-translate/core";
import {PersonSharedModule} from "../person/person-shared.module";
import { AkimStatGraphComponent } from './akim-stat-graph/akim-stat-graph.component';
import {NgChartsModule} from "ng2-charts";
import { AkimStatPieChartComponent } from './akim-stat-pie-chart/akim-stat-pie-chart.component';
import {TreeSelectModule} from "../tree-select/tree-select.module";
import { AkimDemographicsGraphComponent } from './akim-demographics-graph/akim-demographics-graph.component';


@NgModule({
    declarations: [
        AkimMemberComponent,
        AkimStatGraphComponent,
        AkimStatPieChartComponent,
        AkimDemographicsGraphComponent
    ],
    imports: [
        CommonModule,
        AkimRoutingModule,
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        FcSharedModule,
        FormModule,
        FormsModule,
        GridModule,
        IconModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        StatisticsModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        ReactiveFormsModule,
        PersonSharedModule,
        NgChartsModule,
        ButtonGroupModule,
        TooltipModule,
        TreeSelectModule
    ]
})
export class AkimModule {
}
