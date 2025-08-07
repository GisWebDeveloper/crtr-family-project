import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicStatMainComponent} from './dynamic-stat-main/dynamic-stat-main.component';
import {DynamicStatisticsRoutingModule} from "./dynamic-statistics-routing.module";
import {
    AlertModule,
    ButtonGroupModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule,
    ModalModule,
    NavModule,
    TableModule,
    TabsModule,
    UtilitiesModule
} from "@coreui/angular";
import {FcSharedModule} from "../fc-shared.module";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";
import {TableComponent} from "../table/table.component";
import {ChartjsModule} from "@coreui/angular-chartjs";
import {NestedTableComponent} from "../nested-table/nested-table.component";

@NgModule({
    declarations: [
        DynamicStatMainComponent,
        TableComponent,
        NestedTableComponent
    ],
    exports: [
        TableComponent,
        NestedTableComponent
    ],
    imports: [
        CommonModule,
        DynamicStatisticsRoutingModule,
        AlertModule,
        ButtonModule,
        ButtonGroupModule,
        CalloutModule,
        CardModule,
        CollapseModule,
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
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        ChartjsModule
    ]
})
export class DynamicStatisticsModule {
}
