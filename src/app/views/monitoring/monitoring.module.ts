import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MonitoringAspComponent} from './monitoring-asp/monitoring-asp.component';
import {MonitoringAspPotentialComponent} from './monitoring-asp-potential/monitoring-asp-potential.component';
import {MonitoringRoutingModule} from "./monitoring-routing.module";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "@coreui/icons-angular";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";
import {MonitoringNeedActionsComponent} from './monitoring-need-actions/monitoring-need-actions.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {MonitoringChildPathComponent} from './monitoring-child-path/monitoring-child-path.component';
import {FcSharedModule} from "../fc-shared.module";
import {StatisticsModule} from "../statistics/statistics.module";
import { MonitoringIncorrectDataComponent } from './monitoring-incorrect-data/monitoring-incorrect-data.component';


@NgModule({
    declarations: [
        MonitoringAspComponent,
        MonitoringAspPotentialComponent,
        MonitoringChildPathComponent,
        MonitoringNeedActionsComponent,
        MonitoringIncorrectDataComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CommonModule,
        FcSharedModule,
        FormModule,
        FormsModule,
        GridModule,
        IconModule,
        MonitoringRoutingModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        StatisticsModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class MonitoringModule {
}
