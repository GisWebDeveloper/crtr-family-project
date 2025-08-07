import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionStatisticsComponent} from './region-statistics.component';
import {RegionStatisticsRoutingModule} from "./region-statistics-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {NgSelectModule} from "@ng-select/ng-select";
import {
    ButtonModule,
    CardModule,
    CarouselModule,
    FormModule,
    GridModule,
    ModalModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {ChartjsModule} from "@coreui/angular-chartjs";
import {RegionStatisticsGraphModalComponent} from './region-statistics-graph-modal/region-statistics-graph-modal.component';
import {NgChartsModule} from "ng2-charts";
import { RegionStatisticsGraphComponent } from './region-statistics-graph/region-statistics-graph.component';

@NgModule({
    declarations: [
        RegionStatisticsComponent,
        RegionStatisticsGraphModalComponent,
        RegionStatisticsGraphComponent
    ],
    imports: [
        CommonModule,
        RegionStatisticsRoutingModule,
        TranslateModule.forChild({
            extend: true
        }),
        NgSelectModule,
        GridModule,
        CardModule,
        UtilitiesModule,
        FormModule,
        FormsModule,
        IconModule,
        ButtonModule,
        ChartjsModule,
        CarouselModule,
        TableModule,
        ModalModule,
        NgChartsModule
    ]
})
export class RegionStatisticsModule {
}
