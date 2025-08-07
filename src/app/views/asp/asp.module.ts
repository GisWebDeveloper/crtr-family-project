import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AspComponent } from './asp/asp.component';
import { AspListComponent } from './asp/asp-list/asp-list.component';
import {TranslateModule} from "@ngx-translate/core";
import {AspReportComponent} from "./asp/asp-report/asp-report.component";
import {
    CardModule,
    NavModule,
    TabsModule,
    AlertModule,
    ButtonModule,
    CalloutModule,
    CollapseModule,
    FormModule,
    GridModule,
    TableModule,
    UtilitiesModule, ButtonGroupModule, ModalModule
} from "@coreui/angular";
import {AspRoutingModule} from "./asp-routing.module";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";



@NgModule({
    declarations: [
        AspComponent,
        AspReportComponent,
        AspListComponent,
        AspReportComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        AspRoutingModule,
        NavModule,
        TabsModule,
        CardModule,
        AlertModule,
        ButtonModule,
        CalloutModule,
        CollapseModule,
        FormModule,
        GridModule,
        TableModule,
        ButtonGroupModule,
        FormsModule,
        IconModule,
        ModalModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
    ]
})
export class AspModule { }
