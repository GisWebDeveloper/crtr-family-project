import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NeedActionsComponent} from './need-actions.component';
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    ListGroupModule,
    TableModule,
    UtilitiesModule
} from "@coreui/angular";
import {TranslateModule} from "@ngx-translate/core";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [
        NeedActionsComponent
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
export class NeedActionsModule {
}
