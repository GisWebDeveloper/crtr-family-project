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
import {WelfareRoutingModule} from "./welfare-routing.module";
import {WelfareHistoryComponent} from './welfare-history/welfare-history.component';


@NgModule({
    declarations: [
        WelfareHistoryComponent
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
        WelfareRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
    ]
})
export class WelfareModule {
}
