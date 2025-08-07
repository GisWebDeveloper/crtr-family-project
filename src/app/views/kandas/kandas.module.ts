import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    AlertModule,
    ButtonModule,
    CalloutModule,
    CardModule,
    FormModule,
    GridModule,
    ListGroupModule, ModalModule, TableModule, UtilitiesModule
} from "@coreui/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {NgSelectModule} from "@ng-select/ng-select";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {TranslateModule} from "@ngx-translate/core";
import {KandasComponent} from "./kandas.component";
import { KandasStatisticsComponent } from './kandas-statistics/kandas-statistics.component';
import { KandasFormComponent } from './kandas-form/kandas-form.component';
import {RouterModule} from "@angular/router";
import { KandasListModalComponent } from './kandas-list-modal/kandas-list-modal.component';
import { KandasNewStatisticsComponent } from './kandas-new-statistics/kandas-new-statistics.component';
import { KandasFormNewComponent } from './kandas-form-new/kandas-form-new.component';

@NgModule({
    declarations: [
        KandasComponent,
        KandasStatisticsComponent,
        KandasFormComponent,
        KandasListModalComponent,
        KandasNewStatisticsComponent,
        KandasFormNewComponent
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
        ModalModule,
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
export class KandasModule {
}
