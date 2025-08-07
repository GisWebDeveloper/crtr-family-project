import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    ListGroupModule, TableModule, UtilitiesModule
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";
import {SocialRisksComponent} from './social-risks.component';
import {RouterModule} from "@angular/router";


@NgModule({
    declarations: [
        SocialRisksComponent
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
        ListGroupModule,
        NgSelectModule,
        PaginationModule.forRoot(),
        ReactiveFormsModule,
        TableModule,
        TranslateModule.forChild({
            extend: true
        }),
        UtilitiesModule,
        RouterModule
    ]
})
export class SocialRisksModule {
}
