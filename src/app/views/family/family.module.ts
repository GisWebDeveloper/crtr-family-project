import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FamilyComponent} from './family.component';
import {FamilyRoutingModule} from "./family-routing.module";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule,
    FormModule,
    GridModule, ModalModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {FamilyPortraitComponent} from './family-portrait/family-portrait.component';
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "@coreui/icons-angular";
import {PersonSharedModule} from "../person/person-shared.module";
import { FamilyTzhsHistoryGraphComponent } from './family-portrait/family-tzhs-history-graph/family-tzhs-history-graph.component';
import {NgChartsModule} from "ng2-charts";
import {ChartjsModule} from "@coreui/angular-chartjs";
import { FamilyMeriComponent } from './family-meri/family-meri.component';
import {DynamicStatisticsModule} from "../dynamic-statistics/dynamic-statistics.module";
import { FamilyTzhsPointsModalComponent } from './family-portrait/family-tzhs-points-modal/family-tzhs-points-modal.component';
import { FamilyMeriQuestionsComponent } from './family-meri/family-meri-questions/family-meri-questions.component';


@NgModule({
    declarations: [
        FamilyComponent,
        FamilyPortraitComponent,
        FamilyTzhsHistoryGraphComponent,
        FamilyMeriComponent,
        FamilyTzhsPointsModalComponent,
        FamilyMeriQuestionsComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        GridModule,
        FormModule,
        FamilyRoutingModule,
        IconModule,
        PersonSharedModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        NgChartsModule,
        ChartjsModule,
        ModalModule,
        DynamicStatisticsModule
    ]
})
export class FamilyModule {
}
