import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialStatusesComponent} from "./social-statuses.component";
import {SocialStatusesRoutingModule} from "./social-statuses-routing.module";
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
import {FormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {TranslateModule} from "@ngx-translate/core";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";

@NgModule({
    declarations: [
        SocialStatusesComponent
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CalloutModule,
        CardModule,
        CommonModule,
        FormModule,
        FormsModule,
        GridModule,
        IconModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        SocialStatusesRoutingModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule
    ]
})
export class SocialStatusesModule {
}
