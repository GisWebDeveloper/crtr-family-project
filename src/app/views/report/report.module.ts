import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportNeedActionsComponent} from './report-need-actions/report-need-actions.component';
import {ReportRoutingModule} from "./report-routing.module";
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    GridModule,
    ModalModule,
    NavModule,
    TableModule,
    TabsModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {
    ReportNaConsolidatedByCategoryComponent
} from './report-need-actions/report-na-consolidated-by-category/report-na-consolidated-by-category.component';
import {ReportNaByFilterComponent} from './report-need-actions/report-na-by-filter/report-na-by-filter.component';
import {ReportProactiveSmsComponent} from './report-proactive-sms/report-proactive-sms.component';
import {
    ReportPsConsolidatedByCategoryComponent
} from './report-proactive-sms/report-ps-consolidated-by-category/report-ps-consolidated-by-category.component';
import {ReportPsByFilterComponent} from './report-proactive-sms/report-ps-by-filter/report-ps-by-filter.component';
import {ReportPsListModalComponent} from './report-proactive-sms/report-ps-list-modal/report-ps-list-modal.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {ReportNeedAspComponent} from './report-need-asp/report-need-asp.component';
import {
    ReportNeedAspConsolidatedComponent
} from './report-need-asp/report-need-asp-consolidated/report-need-asp-consolidated.component';
import {
    ReportNeedAspByRegionComponent
} from './report-need-asp/report-need-asp-by-region/report-need-asp-by-region.component';
import {ReportEmployablesComponent} from './report-employables/report-employables.component';
import {
    ReportEmployablesListModalComponent
} from './report-employables/report-employables-list-modal/report-employables-list-modal.component';
import {
    ReportEmployablesCategoryComponent
} from './report-employables/report-employables-category/report-employables-category.component';
import { ReportPsWithSmsListModalComponent } from './report-proactive-sms/report-ps-with-sms-list-modal/report-ps-with-sms-list-modal.component';
import { DynamicTableComponent } from './report-rating/dynamic-table/dynamic-table.component';
import { ReportRatingComponent } from './report-rating/report-rating.component';
import { ReportRatingListModalComponent } from './report-rating/report-rating-list-modal/report-rating-list-modal.component';
import { KandasTzhsComponent } from './kandas-tzhs/kandas-tzhs.component';
import { PereselencyTzhsComponent } from './pereselency-tzhs/pereselency-tzhs.component';
import { DynamicTzhsComponent } from './dynamic-tzhs/dynamic-tzhs.component';
import {FcSharedModule} from "../fc-shared.module";
import { DynamicTzhsListModalComponent } from './dynamic-tzhs/dynamic-tzhs-list-modal/dynamic-tzhs-list-modal.component';
import {ActualizationComponent} from "./actualization/actualization.component";
import { DynamicTzhsExternalComponent } from './dinamic-tzhs-external/dynamic-tzhs-external.component';
import { DinamicTzhsThirdComponent } from './dinamic-tzhs-third/dinamic-tzhs-third.component';
import {DynamicStatisticsModule} from "../dynamic-statistics/dynamic-statistics.module";
import { ReportMigrationComponent } from './report-migration/report-migration.component';
import { ReportMigrationListModalComponent } from './report-migration-list-modal/report-migration-list-modal.component';
import { DynamicTzhsThirdNewComponent } from './dinamic-tzhs-third-new/dynamic-tzhs-third-new.component';

@NgModule({
    declarations: [
        ReportEmployablesCategoryComponent,
        ReportEmployablesComponent,
        ReportEmployablesListModalComponent,
        ReportNeedActionsComponent,
        ReportNeedAspByRegionComponent,
        ReportNeedAspComponent,
        ReportNeedAspConsolidatedComponent,
        ReportNaByFilterComponent,
        ReportNaConsolidatedByCategoryComponent,
        ReportProactiveSmsComponent,
        ReportPsByFilterComponent,
        ReportPsConsolidatedByCategoryComponent,
        ReportPsListModalComponent,
        ReportPsWithSmsListModalComponent,
        DynamicTableComponent,
        ReportRatingComponent,
        ReportRatingListModalComponent,
        KandasTzhsComponent,
        PereselencyTzhsComponent,
        DynamicTzhsComponent,
        DynamicTzhsListModalComponent,
        ActualizationComponent,
        DynamicTzhsExternalComponent,
        DinamicTzhsThirdComponent,
        ReportMigrationComponent,
        ReportMigrationListModalComponent,
        DynamicTzhsThirdNewComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CommonModule,
        FormsModule,
        GridModule,
        IconModule,
        ModalModule,
        NavModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        ReportRoutingModule,
        TableModule,
        TabsModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        FcSharedModule,
        DynamicStatisticsModule
    ]
})
export class ReportModule {
}
