import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NecessityComponent} from "./necessity.component";
import {NecessityRoutingModule} from "./necessity-routing.module";
import {
    AlertModule,
    ButtonGroupModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    CollapseModule, FormModule, GridModule, ModalModule,
    NavModule, TableModule, TabsModule, UtilitiesModule
} from "@coreui/angular";
import {FcSharedModule} from "../fc-shared.module";
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        NecessityComponent

    ],
    imports: [
        CommonModule,
        NecessityRoutingModule,
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
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
    ]
})
export class NecessityModule {
}
