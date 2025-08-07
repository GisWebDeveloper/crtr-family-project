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
    ModalModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {IconModule} from "@coreui/icons-angular";
import {TranslateModule} from "@ngx-translate/core";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {GovAgencyRoutingModule} from "./gov-agency-routing.module";
import {GovAgencyMonListComponent} from './gov-agency-mon-list/gov-agency-mon-list.component';
import {GovAgencyMfListComponent} from './gov-agency-mf-list/gov-agency-mf-list.component';
import {GovAgencyMiorListComponent} from './gov-agency-mior-list/gov-agency-mior-list.component';
import {GovAgencyMzListComponent} from './gov-agency-mz-list/gov-agency-mz-list.component';
import {GovAgencyMonReportComponent} from './gov-agency-mon-report/gov-agency-mon-report.component';
import {
    GovAgencyMonReportGardenComponent
} from "./gov-agency-mon-report/gov-agency-mon-report-garden/gov-agency-mon-report-garden.component";
import {
    GovAgencyMonReportSchoolComponent
} from './gov-agency-mon-report/gov-agency-mon-report-school/gov-agency-mon-report-school.component';
import {GovAgencyMfReportComponent} from './gov-agency-mf-report/gov-agency-mf-report.component';
import {
    GovAgencyMfReportIpComponent
} from './gov-agency-mf-report/gov-agency-mf-report-ip/gov-agency-mf-report-ip.component';
import {GovAgencyMiorReportComponent} from './gov-agency-mior-report/gov-agency-mior-report.component';
import {
    GovAgencyMiorReportNeetComponent
} from './gov-agency-mior-report/gov-agency-mior-report-neet/gov-agency-mior-report-neet.component';
import { GovAgencyMzReportComponent } from './gov-agency-mz-report/gov-agency-mz-report.component';
import { GovAgencyMzReportOsmsComponent } from './gov-agency-mz-report/gov-agency-mz-report-osms/gov-agency-mz-report-osms.component';
import { GovAgencyMvdListComponent } from './gov-agency-mvd-list/gov-agency-mvd-list.component';
import { GovAgencyMvdReportComponent } from './gov-agency-mvd-report/gov-agency-mvd-report.component';
import { GovAgencyMvdPrReportComponent } from './gov-agency-mvd-report/gov-agency-mvd-pr-report/gov-agency-mvd-pr-report.component';
import { GovAgencyMonReportDynamicGardenComponent } from './gov-agency-mon-report-dynamic/gov-agency-mon-report-dynamic-garden/gov-agency-mon-report-dynamic-garden.component';
import { GovAgencyMonReportDynamicSchoolComponent } from './gov-agency-mon-report-dynamic/gov-agency-mon-report-dynamic-school/gov-agency-mon-report-dynamic-school.component';
import { GovAgencyMonReportSearchComponent } from './gov-agency-mon-report-search/gov-agency-mon-report-search.component';
import { GovAgencyMonReportDynamicComponent } from './gov-agency-mon-report-dynamic/gov-agency-mon-report-dynamic.component';
import { GovAgencyMiorReportDynamicNeetComponent } from './gov-agency-mior-report-dynamic/gov-agency-mior-report-dynamic-neet/gov-agency-mior-report-dynamic-neet.component';
import { GovAgencyMzReportDynamicOsmsComponent } from './gov-agency-mz-report-dynamic/gov-agency-mz-report-dynamic-osms/gov-agency-mz-report-dynamic-osms.component';
import { GovAgencyReportDynamicListComponent } from './gov-agency-report-dynamic-list/gov-agency-report-dynamic-list.component';
import { GovAgencyMfReportDynamicIpComponent } from './gov-agency-mf-report-dynamic/gov-agency-mf-report-dynamic-ip/gov-agency-mf-report-dynamic-ip.component';
import { XCategoryComponent } from './x-category/x-category.component';
import { GovRepDEComponent } from './gov-rep-de/gov-rep-de.component';
import {FcSharedModule} from "../fc-shared.module";
import { GovRepDeListModalComponent } from './gov-rep-de/gov-rep-de-list-modal/gov-rep-de-list-modal.component';


@NgModule({
    declarations: [
        GovAgencyMfListComponent,
        GovAgencyMfReportComponent,
        GovAgencyMfReportIpComponent,
        GovAgencyMiorListComponent,
        GovAgencyMiorReportComponent,
        GovAgencyMiorReportNeetComponent,
        GovAgencyMonListComponent,
        GovAgencyMonReportComponent,
        GovAgencyMonReportGardenComponent,
        GovAgencyMonReportSchoolComponent,
        GovAgencyMzListComponent,
        GovAgencyMzReportComponent,
        GovAgencyMzReportOsmsComponent,
        GovAgencyMvdListComponent,
        GovAgencyMvdReportComponent,
        GovAgencyMvdPrReportComponent,
        GovAgencyMonReportDynamicGardenComponent,
        GovAgencyMonReportDynamicSchoolComponent,
        GovAgencyMonReportSearchComponent,
        GovAgencyMonReportDynamicComponent,
        GovAgencyMiorReportDynamicNeetComponent,
        GovAgencyMzReportDynamicOsmsComponent,
        GovAgencyReportDynamicListComponent,
        GovAgencyMfReportDynamicIpComponent,
        XCategoryComponent,
        GovRepDEComponent,
        GovRepDeListModalComponent
    ],
    exports: [],
    imports: [
        AlertModule,
        ButtonModule,
        ButtonGroupModule,
        CalloutModule,
        CardModule,
        CollapseModule,
        CommonModule,
        GridModule,
        FormModule,
        FormsModule,
        IconModule,
        ModalModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        GovAgencyRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        FcSharedModule,
    ]
})
export class GovAgencyModule {
}
